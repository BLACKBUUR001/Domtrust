import pg from 'pg';

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error('DATABASE_URL manquant');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });

try {
  const tables = await pool.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema='public' ORDER BY table_name;
  `);
  console.log('TABLES:', tables.rows.map(r => r.table_name));

  for (const { table_name } of tables.rows) {
    const cols = await pool.query(`
      SELECT column_name, data_type, is_nullable, character_maximum_length
      FROM information_schema.columns
      WHERE table_schema='public' AND table_name=$1
      ORDER BY ordinal_position
    `, [table_name]);
    const count = await pool.query(`SELECT COUNT(*)::int AS c FROM ${table_name}`);
    console.log(`\n--- ${table_name} (${count.rows[0].c} rows) ---`);
    cols.rows.forEach(c => console.log(`  ${c.column_name}: ${c.data_type}${c.character_maximum_length ? `(${c.character_maximum_length})` : ''} ${c.is_nullable === 'NO' ? 'NOT NULL' : ''}`));
  }

  const subjects = await pool.query(`
    SELECT subject, COUNT(*)::int AS n FROM contact_submissions GROUP BY subject ORDER BY n DESC;
  `);
  console.log('\n--- Distribution subjects ---');
  subjects.rows.forEach(r => console.log(`  ${r.n.toString().padStart(4)} | ${r.subject ?? '(null)'}`));
} finally {
  await pool.end();
}
