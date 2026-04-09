'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const C = {
  eloBlue:     '#00192B',
  azurite:     '#0F243C',
  winterMetal: '#475B6D',
  stoneGray:   '#7A8790',
  rustOrange:  '#994F24',
  auLait:      '#C3AF94',
  lightCream:  '#E6DBCE',
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, senha }),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '4px',
    border: `1px solid ${C.winterMetal}`,
    backgroundColor: 'rgba(0,25,43,0.7)',
    color: C.lightCream,
    fontSize: '15px',
    fontFamily: 'var(--font-inter)',
    outline: 'none',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.eloBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: C.azurite,
          border: `1px solid ${C.winterMetal}`,
          borderRadius: '8px',
          padding: '48px 40px',
        }}
      >
        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: C.rustOrange,
              fontFamily: 'var(--font-inter)',
              marginBottom: '12px',
            }}
          >
            Elo Education
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: C.lightCream,
              fontFamily: 'var(--font-lato)',
              letterSpacing: '0.05em',
            }}
          >
            GPS People
          </div>
          <div
            style={{
              width: '40px',
              height: '2px',
              background: `linear-gradient(90deg, ${C.rustOrange}, ${C.auLait})`,
              margin: '16px auto 0',
            }}
          />
          <div
            style={{
              marginTop: '20px',
              fontSize: '13px',
              color: C.stoneGray,
              letterSpacing: '0.08em',
            }}
          >
            Painel Administrativo
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: C.stoneGray,
                marginBottom: '8px',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Login
            </label>
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              placeholder="Usuário"
              required
              autoComplete="username"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: C.stoneGray,
                marginBottom: '8px',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showSenha ? 'text' : 'password'}
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="Senha"
                required
                autoComplete="current-password"
                style={{ ...inputStyle, paddingRight: '48px' }}
              />
              <button
                type="button"
                onClick={() => setShowSenha(v => !v)}
                aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: C.stoneGray,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                {showSenha ? (
                  /* Eye-off icon */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {status === 'error' && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '4px',
                backgroundColor: 'rgba(153,79,36,0.12)',
                border: `1px solid ${C.rustOrange}`,
                color: C.auLait,
                fontSize: '13px',
                textAlign: 'center',
              }}
            >
              Credenciais inválidas. Tente novamente.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              marginTop: '8px',
              padding: '16px 24px',
              backgroundColor: C.rustOrange,
              color: C.lightCream,
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '4px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              fontFamily: 'var(--font-inter)',
              transition: 'background-color 0.2s',
            }}
          >
            {status === 'loading' ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
