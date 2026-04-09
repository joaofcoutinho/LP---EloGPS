import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureLeadsTable } from '../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { nome, email, whatsapp, cargo } = await req.json();

    if (!nome || !email || !whatsapp) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    await ensureLeadsTable();

    await sql`
      INSERT INTO leads (nome, email, whatsapp, cargo)
      VALUES (${nome}, ${email}, ${whatsapp}, ${cargo || null})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[leads]', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
