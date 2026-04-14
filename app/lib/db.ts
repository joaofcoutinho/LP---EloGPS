import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

export async function ensureLeadsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id        SERIAL PRIMARY KEY,
      nome      TEXT NOT NULL,
      email     TEXT NOT NULL,
      whatsapp  TEXT NOT NULL,
      cargo     TEXT,
      cupom     TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  // Adiciona coluna cupom em tabelas já existentes
  await sql`
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS cupom TEXT
  `;
}
