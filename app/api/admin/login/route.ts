import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_LOGIN = 'admin';
const ADMIN_SENHA = 'eloadmin26';

export async function POST(req: NextRequest) {
  const { login, senha } = await req.json();

  if (login !== ADMIN_LOGIN || senha !== ADMIN_SENHA) {
    return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
  }

  const token = process.env.ADMIN_TOKEN!;
  const store = await cookies();
  store.set('elo_admin', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 horas
  });

  return NextResponse.json({ ok: true });
}
