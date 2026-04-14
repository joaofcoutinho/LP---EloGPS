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
  const cupomRaw = (formData.get('cupom')    as string)?.trim().toUpperCase() || null;

  if (!nome || !email || !whatsapp) {
    return { error: 'Preencha todos os campos obrigatórios.' };
  }

  // Valida cupom se preenchido
  const VALID_COUPONS = new Set([
    'KLEBER100','KLEBER90','KLEBER80','KLEBER70',
    'LUCIANA100','LUCIANA90','LUCIANA80','LUCIANA70',
    'CAMILA100','CAMILA90','CAMILA80','CAMILA70',
    'RAPHAEL100','RAPHAEL90','RAPHAEL80','RAPHAEL70',
  ]);
  if (cupomRaw && !VALID_COUPONS.has(cupomRaw)) {
    return { error: 'Cupom inválido. Verifique e tente novamente.' };
  }
  const cupom = cupomRaw || null;

  try {
    await ensureLeadsTable();
    await sql`
      INSERT INTO leads (nome, email, whatsapp, cargo, cupom)
      VALUES (${nome}, ${email}, ${whatsapp}, ${cargo}, ${cupom})
    `;
    return { ok: true };
  } catch (err) {
    console.error('[saveLead]', err);
    return { error: 'Erro ao salvar. Tente novamente.' };
  }
}
