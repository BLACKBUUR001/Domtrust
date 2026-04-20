import pg from 'pg';

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error('DATABASE_URL manquant');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });

const client = await pool.connect();
try {
  await client.query('BEGIN');

  // 1. Colonne category
  await client.query(`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS category VARCHAR(20);
  `);

  // 2. Backfill depuis subject (mapping normalisé)
  await client.query(`
    UPDATE contact_submissions
    SET category = CASE
      WHEN subject ILIKE '%waitlist%' OR subject ILIKE '%liste%d%attente%' THEN 'waitlist'
      WHEN subject ILIKE '%prestataire%' THEN 'provider'
      WHEN subject ILIKE '%agence%' OR subject ILIKE '%partenariat%' THEN 'agency_interest'
      WHEN subject ILIKE '%probl%me%' OR subject ILIKE '%signaler%' OR subject ILIKE '%bug%' THEN 'problem'
      ELSE 'general'
    END
    WHERE category IS NULL;
  `);

  // 3. NOT NULL + DEFAULT + CHECK
  await client.query(`
    ALTER TABLE contact_submissions
    ALTER COLUMN category SET NOT NULL,
    ALTER COLUMN category SET DEFAULT 'general';
  `);

  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_category_check') THEN
        ALTER TABLE contact_submissions
        ADD CONSTRAINT contact_category_check
        CHECK (category IN ('waitlist','provider','agency_interest','general','problem'));
      END IF;
    END $$;
  `);

  // 4. Index sur category
  await client.query(`
    CREATE INDEX IF NOT EXISTS contact_submissions_category_idx
    ON contact_submissions(category, created_at DESC);
  `);

  // 5. Vues par catégorie
  const views = [
    ['v_waitlist', 'waitlist'],
    ['v_providers', 'provider'],
    ['v_agency_interest', 'agency_interest'],
    ['v_general', 'general'],
    ['v_problems', 'problem']
  ];

  for (const [view, cat] of views) {
    await client.query(`
      CREATE OR REPLACE VIEW ${view} AS
      SELECT id, fname, lname, email, phone, subject, message, created_at
      FROM contact_submissions
      WHERE category = '${cat}'
      ORDER BY created_at DESC;
    `);
  }

  await client.query('COMMIT');
  console.log('Migration appliquee avec succes');

  // Verif
  const dist = await client.query(`
    SELECT category, COUNT(*)::int AS n FROM contact_submissions GROUP BY category ORDER BY n DESC;
  `);
  console.log('\nDistribution par category:');
  dist.rows.forEach(r => console.log(`  ${r.n.toString().padStart(4)} | ${r.category}`));

  const viewList = await client.query(`
    SELECT table_name FROM information_schema.views
    WHERE table_schema='public' ORDER BY table_name;
  `);
  console.log('\nVues creees:', viewList.rows.map(r => r.table_name));
} catch (err) {
  await client.query('ROLLBACK');
  console.error('Migration echouee:', err.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}
