'use server';

import { sql, ensureLeadsTable } from '../lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    'ELO100',
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

    resend.emails.send({
      from: 'GPS People <noreply@eloe-health.com.br>',
      to: 'coord.comercial@eloe-health.com.br',
      subject: `Novo lead: ${nome}`,
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Cargo:</strong> ${cargo ?? '—'}</p>
        <p><strong>Cupom:</strong> ${cupom ?? '—'}</p>
      `,
    }).catch(err => console.error('[resend]', err));

    return { ok: true };
  } catch (err) {
    console.error('[saveLead]', err);
    return { error: 'Erro ao salvar. Tente novamente.' };
  }
}
