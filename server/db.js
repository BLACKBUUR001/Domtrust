import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Créer les tables au démarrage
export async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        fname VARCHAR(100) NOT NULL,
        lname VARCHAR(100),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(200),
        message TEXT,
        category VARCHAR(20) NOT NULL DEFAULT 'general'
          CHECK (category IN ('waitlist','provider','agency_interest','general','problem')),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS contact_submissions_category_idx
      ON contact_submissions(category, created_at DESC);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS agency_submissions (
        id SERIAL PRIMARY KEY,
        agency_name VARCHAR(200) NOT NULL,
        manager VARCHAR(200) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        nb_providers VARCHAR(50),
        coverage_zone VARCHAR(300),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Tables créées / vérifiées avec succès');
  } catch (err) {
    console.error('❌ Erreur création tables:', err.message);
  } finally {
    client.release();
  }
}

export default pool;
