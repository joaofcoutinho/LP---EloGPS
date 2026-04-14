'use client';

import { useActionState } from 'react';
import { saveLead } from '../actions/saveLead';

const VALID_COUPONS: Record<string, number> = Object.fromEntries(
  ['KLEBER', 'LUCIANA', 'CAMILA', 'RAPHAEL'].flatMap(name =>
    [100, 90, 80, 70].map(pct => [`${name}${pct}`, pct])
  )
);

interface LeadFormProps {
  cupom: string;
  onCupomChange: (v: string) => void;
}

export default function LeadForm({ cupom, onCupomChange }: LeadFormProps) {
  const [state, action, isPending] = useActionState(saveLead, null);

  const discount = VALID_COUPONS[cupom] ?? null;
  const couponValid   = cupom.length > 0 && discount !== null;
  const couponInvalid = cupom.length > 0 && discount === null;

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '4px',
    border: '1px solid #475B6D',
    backgroundColor: 'rgba(0,25,43,0.6)',
    color: '#E6DBCE',
    fontSize: '15px',
    fontFamily: 'var(--font-inter)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  if (state?.ok) {
    return (
      <div
        className="text-center py-10 px-8 rounded"
        style={{ border: '1px solid #994F24', backgroundColor: 'rgba(153,79,36,0.08)' }}
      >
        <div className="text-3xl mb-3" style={{ color: '#994F24', fontFamily: 'var(--font-lato)' }}>
          Vaga reservada!
        </div>
        <p style={{ color: '#C3AF94' }}>
          Em breve você receberá os detalhes no seu e-mail e WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <input
        type="text"
        name="nome"
        placeholder="Nome completo"
        required
        style={inputBase}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail profissional"
        required
        style={inputBase}
      />
      <input
        type="tel"
        name="whatsapp"
        placeholder="WhatsApp (com DDD)"
        required
        style={inputBase}
      />
      <select
        name="cargo"
        defaultValue=""
        style={{ ...inputBase, cursor: 'pointer', color: '#7A8790' }}
      >
        <option value="" disabled style={{ background: '#0F1E30', color: '#7A8790' }}>Seu cargo / posição</option>
        <option value="gestor_clinica"     style={{ background: '#0F1E30', color: '#E6DBCE' }}>Gestor(a) de Clínica</option>
        <option value="diretor_hospital"   style={{ background: '#0F1E30', color: '#E6DBCE' }}>Diretor(a) de Hospital</option>
        <option value="coordenador"        style={{ background: '#0F1E30', color: '#E6DBCE' }}>Coordenador(a)</option>
        <option value="socio_proprietario" style={{ background: '#0F1E30', color: '#E6DBCE' }}>Sócio / Proprietário</option>
        <option value="outro"              style={{ background: '#0F1E30', color: '#E6DBCE' }}>Outro</option>
      </select>

      {/* Campo cupom */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          name="cupom"
          placeholder="Cupom (opcional)"
          value={cupom}
          onChange={e => onCupomChange(e.currentTarget.value.toUpperCase())}
          style={{
            ...inputBase,
            textTransform: 'uppercase',
            border: couponValid
              ? '1px solid rgba(153,79,36,0.6)'
              : couponInvalid
                ? '1px solid rgba(180,60,60,0.6)'
                : '1px solid #475B6D',
            paddingRight: '44px',
          }}
        />
        {couponValid && (
          <span style={{
            position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
            color: '#994F24', fontSize: '16px',
          }}>✓</span>
        )}
        {couponInvalid && (
          <span style={{
            position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
            color: '#b44444', fontSize: '14px',
          }}>✗</span>
        )}
      </div>

      {couponInvalid && (
        <p style={{ color: '#b44444', fontSize: '12px', marginTop: '-8px', fontFamily: 'var(--font-inter)' }}>
          Cupom inválido.
        </p>
      )}

      {state?.error && (
        <p style={{ color: '#C3AF94', fontSize: '13px', textAlign: 'center' }}>
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          padding: '16px 24px',
          backgroundColor: '#994F24',
          color: '#E6DBCE',
          fontSize: '15px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          border: 'none',
          borderRadius: '4px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          opacity: isPending ? 0.7 : 1,
          transition: 'all 0.2s',
          fontFamily: 'var(--font-inter)',
        }}
        onMouseEnter={e => {
          if (!isPending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7a3d1a';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#994F24';
        }}
      >
        {isPending ? 'Reservando...' : 'Garantir minha vaga'}
      </button>

      <p className="text-center text-xs" style={{ color: '#475B6D' }}>
        Você receberá um contato do time comercial Elo Education via WhatsApp.
      </p>
    </form>
  );
}
