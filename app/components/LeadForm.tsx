'use client';

import { useState, FormEvent } from 'react';

interface LeadFormProps {
  variant?: 'dark' | 'light';
  showPrice?: boolean;
}

export default function LeadForm({ variant = 'dark', showPrice = false }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', cargo: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    // Placeholder: conectar ao backend/webhook de captação
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  }

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

  if (status === 'success') {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        value={form.nome}
        onChange={handleChange}
        style={inputBase}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail profissional"
        required
        value={form.email}
        onChange={handleChange}
        style={inputBase}
      />
      <input
        type="tel"
        name="whatsapp"
        placeholder="WhatsApp (com DDD)"
        required
        value={form.whatsapp}
        onChange={handleChange}
        style={inputBase}
      />
      <select
        name="cargo"
        value={form.cargo}
        onChange={handleChange}
        style={{ ...inputBase, cursor: 'pointer', color: form.cargo ? '#E6DBCE' : '#7A8790' }}
      >
        <option value="" disabled>Seu cargo / posição</option>
        <option value="gestor_clinica">Gestor(a) de Clínica</option>
        <option value="diretor_hospital">Diretor(a) de Hospital</option>
        <option value="coordenador">Coordenador(a)</option>
        <option value="socio_proprietario">Sócio / Proprietário</option>
        <option value="outro">Outro</option>
      </select>

      <button
        type="submit"
        disabled={status === 'loading'}
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
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'all 0.2s',
          fontFamily: 'var(--font-inter)',
        }}
        onMouseEnter={e => {
          if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7a3d1a';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#994F24';
        }}
      >
        {status === 'loading' ? 'Reservando...' : 'Garantir minha vaga'}
      </button>

      <p className="text-center text-xs" style={{ color: '#475B6D' }}>
        Seus dados estão protegidos. Sem spam.
      </p>
    </form>
  );
}
