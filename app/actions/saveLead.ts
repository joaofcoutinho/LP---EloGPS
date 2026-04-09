'use server';

import { sql, ensureLeadsTable } from '../lib/db';

export async function saveLead(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string }> {
  const nome     = (formData.get('nome')     as string)?.trim();
  const email    = (formData.get('email')    as string)?.trim();
  const whatsapp = (formData.get('whatsapp') as string)?.trim();
  const cargo    = (formData.get('cargo')    as string) || null;

  if (!nome || !email || !whatsapp) {
    return { error: 'Preencha todos os campos obrigatórios.' };
  }

  try {
    await ensureLeadsTable();
    await sql`
      INSERT INTO leads (nome, email, whatsapp, cargo)
      VALUES (${nome}, ${email}, ${whatsapp}, ${cargo})
    `;
    return { ok: true };
  } catch (err) {
    console.error('[saveLead]', err);
    return { error: 'Erro ao salvar. Tente novamente.' };
  }
}
