'use client';

import { useState } from 'react';
import LeadForm from './LeadForm';

const C = {
  denimDive:   '#000A1C',
  rustOrange:  '#994F24',
  stoneGray:   '#7A8790',
  lightCream:  '#E6DBCE',
  auLait:      '#C3AF94',
};

const BASE_PRICE = 1490;

const VALID_COUPONS: Record<string, number> = {
  ELO100: 100,
  ...Object.fromEntries(
    ['KLEBER', 'LUCIANA', 'CAMILA', 'RAPHAEL'].flatMap(name =>
      [100, 90, 80, 70].map(pct => [`${name}${pct}`, pct])
    )
  ),
};

function formatPrice(v: number) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
}

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '11px', fontWeight: 600, letterSpacing: '0.35em',
      textTransform: 'uppercase', color: C.rustOrange,
      fontFamily: 'var(--font-inter)', marginBottom: '20px',
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div style={{
      width: '56px', height: '2px',
      background: `linear-gradient(90deg, ${C.rustOrange}, ${C.auLait})`,
      margin: '0 auto',
    }} />
  );
}

export default function InscricaoSection() {
  const [cupom, setCupom] = useState('');

  const discount = VALID_COUPONS[cupom] ?? null;
  const finalPrice = discount !== null ? Math.round(BASE_PRICE * (1 - discount / 100)) : BASE_PRICE;
  const isFree = finalPrice === 0;
  const couponValid = cupom.length > 0 && discount !== null;

  const detalhes = [
    { label: 'Data',    value: '24 de Abril de 2026' },
    { label: 'Formato', value: 'Presencial' },
    { label: 'Duração', value: '4 horas' },
    { label: 'Horário', value: '14h às 18h' },
    { label: 'Vagas',   value: 'Limitadas' },
  ];

  return (
    <section id="inscricao" className="section-pad" style={{
      backgroundColor: C.denimDive,
      padding: '96px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 75% 50%, rgba(153,79,36,0.08) 0%, transparent 70%)`,
      }} />

      <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative' }}>

        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <EyebrowLabel>Garanta sua vaga</EyebrowLabel>
          <h2 style={{
            fontFamily: 'var(--font-lato)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: C.lightCream,
            marginBottom: '16px', lineHeight: 1.15,
          }}>
            Uma imersão que transforma<br />a forma como você lidera
          </h2>
          <Divider />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '48px', alignItems: 'start',
        }}>

          {/* Left: detalhes do evento */}
          <div style={{
            padding: '40px 44px',
            border: `1px solid rgba(146,115,80,0.3)`,
            borderRadius: '4px',
            background: 'linear-gradient(135deg, rgba(15,36,60,0.6) 0%, rgba(0,10,28,0.8) 100%)',
          }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: C.stoneGray, fontFamily: 'var(--font-inter)', marginBottom: '28px',
            }}>
              Detalhes do evento
            </p>

            {detalhes.map(({ label, value }, i) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                padding: '16px 0',
                borderBottom: `1px solid rgba(71,91,109,0.25)`,
              }}>
                <span style={{ fontSize: '13px', color: C.stoneGray, fontFamily: 'var(--font-inter)' }}>{label}</span>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-inter)', color: C.lightCream }}>
                  {value}
                </span>
              </div>
            ))}

            {/* Investimento — dinâmico com cupom */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
              padding: '16px 0',
            }}>
              <span style={{ fontSize: '13px', color: C.stoneGray, fontFamily: 'var(--font-inter)' }}>
                Investimento
              </span>

              {couponValid ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{
                    fontSize: '14px', color: C.stoneGray,
                    fontFamily: 'var(--font-lato)', textDecoration: 'line-through',
                  }}>
                    R$ {formatPrice(BASE_PRICE)}
                  </span>
                  <span style={{
                    fontSize: '20px', fontWeight: 700,
                    fontFamily: 'var(--font-lato)', color: C.rustOrange,
                  }}>
                    {isFree ? 'Gratuito' : `R$ ${formatPrice(finalPrice)}`}
                  </span>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                    color: C.rustOrange, backgroundColor: 'rgba(153,79,36,0.12)',
                    padding: '3px 8px', borderRadius: '100px',
                    border: '1px solid rgba(153,79,36,0.3)',
                  }}>
                    -{discount}%
                  </span>
                </div>
              ) : (
                <span style={{
                  fontSize: '20px', fontWeight: 700,
                  fontFamily: 'var(--font-lato)', color: C.rustOrange,
                }}>
                  R$ {formatPrice(BASE_PRICE)}
                </span>
              )}
            </div>

            {couponValid && (
              <p style={{
                fontSize: '12px', color: C.auLait,
                fontFamily: 'var(--font-inter)', marginTop: '4px', textAlign: 'right',
              }}>
                Cupom <strong>{cupom}</strong> aplicado.
              </p>
            )}
          </div>

          {/* Right: form */}
          <div style={{
            padding: '44px 40px',
            border: `1px solid rgba(153,79,36,0.25)`,
            borderRadius: '4px',
            background: 'linear-gradient(160deg, rgba(15,36,60,0.75) 0%, rgba(0,10,28,0.9) 100%)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{
                fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: C.rustOrange, fontFamily: 'var(--font-inter)',
              }}>
                Inscrição
              </span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-lato)',
              fontSize: '2rem', fontWeight: 700,
              color: C.lightCream, marginBottom: '4px', lineHeight: 1.15,
            }}>
              Reserve sua vaga
            </h3>
            <p style={{ fontSize: '13px', color: C.stoneGray, fontFamily: 'var(--font-inter)', marginBottom: '32px' }}>
              GPS People · Elo Education
            </p>
            <LeadForm cupom={cupom} onCupomChange={setCupom} />
          </div>

        </div>
      </div>
    </section>
  );
}
