'use client';

import { useActionState } from 'react';
import { saveLead } from '../actions/saveLead';

interface LeadFormProps {
  variant?: 'dark' | 'light';
  showPrice?: boolean;
}

export default function LeadForm({ variant = 'dark', showPrice = false }: LeadFormProps) {
  const [state, action, isPending] = useActionState(saveLead, null);

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '4px',
    border: '1px solid #475B6D',
    backgroundColor: variant === 'dark' ? 'rgba(0,25,43,0.6)' : 'rgba(255,255,255,0.08)',
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
          Vaga garantida!
        </div>
        <p style={{ color: '#C3AF94' }}>
          Em breve você receberá os detalhes no seu e-mail e WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {showPrice && (
        <div className="text-center mb-2">
          <span
            className="text-sm tracking-widest uppercase"
            style={{ color: '#7A8790' }}
          >
            Investimento
          </span>
          <div
            className="text-4xl font-bold mt-1"
            style={{ fontFamily: 'var(--font-lato)', color: '#994F24' }}
          >
            R$ 1.490
          </div>
          <div className="text-sm mt-1" style={{ color: '#927350' }}>
            por participante · vagas limitadas
          </div>
        </div>
      )}

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
        <option value="" disabled>Seu cargo / posição</option>
        <option value="gestor_clinica">Gestor(a) de Clínica</option>
        <option value="diretor_hospital">Diretor(a) de Hospital</option>
        <option value="coordenador">Coordenador(a)</option>
        <option value="socio_proprietario">Sócio / Proprietário</option>
        <option value="outro">Outro</option>
      </select>

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
        Seus dados estão protegidos. Sem spam.
      </p>
    </form>
  );
}
