import Image from 'next/image';
import Countdown from './components/Countdown';
import InscricaoSection from './components/InscricaoSection';

/* ─── Design tokens ─── */
const C = {
  denimDive:    '#000A1C',
  eloBlue:      '#00192B',
  azurite:      '#0F243C',
  winterMetal:  '#475B6D',
  stoneGray:    '#7A8790',
  rustOrange:   '#994F24',
  cremeBrulee:  '#927350',
  auLait:       '#C3AF94',
  rusticCotton: '#D8C9B4',
  lightCream:   '#E6DBCE',
};



/* ─── CTA Button ─── */
function CTAButton({ label = 'Garantir minha vaga', href = '#inscricao' }: { label?: string; href?: string }) {
  return (
    <a href={href} style={{
      display: 'inline-block', padding: '18px 48px',
      backgroundColor: C.rustOrange, color: C.lightCream,
      fontSize: '13px', fontWeight: 700, letterSpacing: '0.16em',
      textTransform: 'uppercase', textDecoration: 'none', borderRadius: '3px',
      fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap',
    }}>
      {label}
    </a>
  );
}

/* ─── Luxury divider ─── */
function Divider({ centered = false }: { centered?: boolean }) {
  return (
    <div style={{
      width: '56px', height: '2px',
      background: `linear-gradient(90deg, ${C.rustOrange}, ${C.auLait})`,
      margin: centered ? '0 auto' : undefined,
    }} />
  );
}

/* ─── Section separator ─── */
function SectionSep() {
  return (
    <div style={{
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${C.rustOrange} 30%, ${C.auLait} 70%, transparent)`,
    }} />
  );
}

/* ─── Eyebrow label ─── */
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

/* ════════════════════════════════════════
   MENTORES
════════════════════════════════════════ */
const mentores = [
  {
    nome: 'Raphael Ruffo',
    cargo: 'Diretor Executivo',
    empresa: 'Alfaduo Desenvolvimento Humano',
    bio: 'Empresário, cofundador e Diretor Executivo da Alfaduo. Especialista em comportamento humano, liderança e performance organizacional.',
    img: '/palestrantes/Raphael.jpeg',
  },
  {
    nome: 'Luciana Roberty',
    cargo: 'CEO',
    empresa: 'Jobz',
    bio: 'Especialista A&S + Carreira, responsável por mais de 5 mil contratações. Há mais de 19 anos lidera processos estratégicos de aquisição de talentos.',
    img: '/palestrantes/luciana.jpeg',
  },
  {
    nome: 'Camila Salles',
    cargo: 'Diretora de Saúde',
    empresa: 'Alfaduo Desenvolvimento Humano',
    bio: 'Especialista em saúde, neurociência, ergonomia, performance e bem-estar humano como ativos estratégicos nas empresas.',
    img: '/palestrantes/Camila.jpeg',
  },
  {
    nome: 'Kleber Alves',
    cargo: 'Diretor de Negócios',
    empresa: 'Cajuza Moraes Seguros',
    bio: 'Conselheiro da Elo e-Health. Com 34 anos de experiência, especialista em Recrutamento e Seleção e desenvolvimento de lideranças.',
    img: '/palestrantes/kleber.jpeg',
  },
];

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export default function Home() {
  return (
    <>

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section style={{
        backgroundColor: C.denimDive,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        backgroundImage: 'url(/palestra.png)',
        backgroundSize: 'cover', backgroundPosition: 'center -120px', backgroundRepeat: 'no-repeat',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Overlay geral suave */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'rgba(0,10,28,0.60)' }} />
        {/* Gradiente principal: debaixo para cima */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(to top, rgba(0,10,28,0.98) 0%, rgba(0,10,28,0.80) 40%, rgba(0,10,28,0.20) 75%, rgba(0,10,28,0.0) 100%)`,
        }} />
        {/* Gradiente fusão com seção abaixo */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '280px',
          pointerEvents: 'none',
          background: `linear-gradient(to top, ${C.eloBlue} 0%, transparent 100%)`,
        }} />

        {/* ── NAV ── */}
        <nav className="hero-nav" style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 56px',
        }}>
          {/* Logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <Image
              src="/KV/KV%20Criativos%20GPS%20ELO%20PEOPLE/SELO/%5BELOEDUCACION%5DCriativo_GPSEloPeople-04.png"
              alt="GPS People" width={72} height={72} style={{ objectFit: 'contain' }}
              className="hero-nav-logo-gps"
            />
            <div style={{ width: '1px', height: '26px', background: `linear-gradient(180deg, transparent, ${C.winterMetal}, transparent)` }} />
            <Image
              src="/logos/logo-eloeducation.png"
              alt="Elo Education" width={180} height={50} style={{ objectFit: 'contain' }}
              className="hero-nav-logo-elo"
            />
          </div>

          {/* Links */}
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {[
              { label: 'Sobre',        href: '#diagnostico' },
              { label: 'Conteúdo',     href: '#como-funciona' },
              { label: 'Palestrantes', href: '#palestrantes' },
              { label: 'Inscrição',    href: '#inscricao' },
            ].map(({ label, href }) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hero-nav-cta" style={{ flexShrink: 0 }}>
            <CTAButton label="Garantir vaga" />
          </div>
        </nav>

        {/* ── CORPO ── */}
        <div style={{
          flex: 1, position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div className="hero-content-mobile" style={{ maxWidth: '700px', width: '100%', margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

            {/* Data + local */}
            <div className="hero-date-bar" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: '#fff', fontFamily: 'var(--font-inter)', lineHeight: 1.1 }}>
                  24 de Abril
                </div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)' }}>
                  de 2026
                </div>
              </div>
              <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: '#fff', fontFamily: 'var(--font-inter)', lineHeight: 1.1 }}>
                  Imersão
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)' }}>
                  4 horas intensivas
                </div>
              </div>
            </div>

            {/* Título massivo */}
            <h1 style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(5rem, 10.5vw, 9rem)',
              fontWeight: 900, lineHeight: 0.88,
              color: '#fff', letterSpacing: '-0.03em',
              marginBottom: '24px',
              textShadow: '0 2px 40px rgba(0,0,0,0.4)',
            }}>
              GPS<br />
              <span style={{ color: C.rustOrange }}>People</span>
            </h1>

            {/* Eyebrow */}
            <p style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: C.rustOrange,
              fontFamily: 'var(--font-inter)', marginBottom: '12px',
            }}>
              Gestão profissional da saúde focada em pessoas
            </p>

            {/* Subtítulo */}
            <h2 style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
              fontWeight: 700, lineHeight: 1.2,
              color: '#fff', marginBottom: '14px',
            }}>
              Uma imersão que transforma<br />a forma como você lidera
            </h2>

            <p style={{
              fontSize: '14px', lineHeight: 1.75, color: 'rgba(216,201,180,0.85)',
              fontFamily: 'var(--font-inter)', marginBottom: '28px',
            }}>
              4 horas práticas para líderes de clínicas e hospitais que querem
              estruturar suas equipes e entregar resultados consistentes.
            </p>

            {/* Avatares + CTA em linha */}
            <div className="hero-speakers" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <CTAButton />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex' }}>
                  {[
                    '/palestrantes/Raphael.jpeg',
                    '/palestrantes/luciana.jpeg',
                    '/palestrantes/Camila.jpeg',
                    '/palestrantes/kleber.jpeg',
                  ].map((src, i) => (
                    <div key={src} style={{
                      width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden',
                      border: `2px solid rgba(255,255,255,0.3)`,
                      marginLeft: i === 0 ? 0 : '-8px',
                      position: 'relative', zIndex: 4 - i,
                    }}>
                      <Image src={src} alt="Palestrante" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="36px" />
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)' }}>
                  4 palestrantes
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. DIAGNÓSTICO
          bg: eloBlue
      ══════════════════════════════════════ */}
      <section id="diagnostico" className="section-pad" style={{ backgroundColor: C.eloBlue, padding: '96px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <EyebrowLabel>Identificação rápida</EyebrowLabel>
            <h2 style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700, color: C.lightCream, marginBottom: '24px',
            }}>
              Sua clínica tem essa rotina:
            </h2>
            <Divider centered />
          </div>

          <div className="diag-grid">
            {[
              {
                text: 'Sua equipe depende demais de você',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="7" r="3" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="4.5" cy="9" r="2" stroke="#994F24" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M1 19c0-2.21 1.567-4 3.5-4" stroke="#994F24" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="19.5" cy="9" r="2" stroke="#994F24" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M23 19c0-2.21-1.567-4-3.5-4" stroke="#994F24" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                text: 'Você resolve o mesmo problema toda semana',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.364 2.636" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M3 7v5h5" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8v4l3 3" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                text: 'Falta clareza nas responsabilidades do seu time',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="#994F24" strokeWidth="1.8"/>
                    <line x1="7" y1="9" x2="17" y2="9" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="7" y1="13" x2="13" y2="13" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="17" y1="13" x2="17" y2="13" stroke="#994F24" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="7" y1="17" x2="10" y2="17" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                text: 'A comunicação gera muito retrabalho',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="9" y1="9" x2="15" y2="9" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="9" y1="13" x2="13" y2="13" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                text: 'Alta rotatividade de equipe',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="10 17 15 12 10 7" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="15" y1="12" x2="3" y2="12" stroke="#994F24" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
            ].map(({ text, icon }) => (
              <div
                key={text}
                className="diag-card"
                style={{
                  position: 'relative',
                  padding: '32px 28px',
                  borderRadius: '4px',
                  border: `1px solid rgba(71,91,109,0.35)`,
                  borderLeft: `3px solid ${C.rustOrange}`,
                  background: 'linear-gradient(140deg, rgba(15,36,60,0.75) 0%, rgba(0,10,28,0.95) 100%)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                {/* Ícone */}
                <div
                  className="diag-icon"
                  style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    border: `1px solid rgba(153,79,36,0.4)`,
                    backgroundColor: 'rgba(153,79,36,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background-color 0.25s ease',
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>

                {/* Texto */}
                <span style={{
                  fontSize: '16px', fontWeight: 600,
                  color: C.lightCream,
                  fontFamily: 'var(--font-inter)',
                  lineHeight: 1.5,
                }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '17px', color: C.auLait, fontFamily: 'var(--font-inter)', marginBottom: '28px' }}>
              Se você se identificou com dois ou mais itens,{' '}
              <strong style={{ color: C.lightCream }}>esse evento foi feito para você.</strong>
            </p>
            <CTAButton />
          </div>

        </div>
      </section>

      <SectionSep />

      {/* ══════════════════════════════════════
          3. VIRADA DE CHAVE
          bg: denimDive — mais escuro
      ══════════════════════════════════════ */}
      <section id="virada" className="section-pad" style={{ backgroundColor: C.denimDive, padding: '96px 48px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <EyebrowLabel>A raiz do problema</EyebrowLabel>
            <h2 style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700, color: C.lightCream,
              maxWidth: '680px', margin: '0 auto 16px',
              lineHeight: 1.25,
            }}>
              O problema está no sistema de gestão de equipe
              que você construiu para a sua clínica.
            </h2>
        
            <Divider centered />
            <p style={{
              fontSize: '16px', lineHeight: 1.8, color: C.rusticCotton,
              fontFamily: 'var(--font-inter)', marginTop: '28px',
              maxWidth: '580px', margin: '28px auto 0',
            }}>
              Em uma operação forte e estruturada, você lidera com clareza
              em cada frente. Se isso não está organizado, a performance não
              se sustenta e nem&nbsp;escala.
            </p>
          </div>

          {/* 5 pilares */}
          <div className="pilares-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '2px',
            borderRadius: '4px',
            overflow: 'hidden',
            border: `1px solid rgba(71,91,109,0.35)`,
          }}>
            {[
              { num: '01', title: 'Energia',       desc: 'A base de tudo que o time é capaz de executar' },
              { num: '02', title: 'Comportamento', desc: 'Padrões que definem a cultura real da operação' },
              { num: '03', title: 'Comunicação',   desc: 'Onde a maioria dos problemas nasce e se repete' },
              { num: '04', title: 'Estrutura',     desc: 'Processos e responsabilidades com clareza' },
              { num: '05', title: 'Performance',   desc: 'Resultados sustentáveis e escaláveis' },
            ].map(({ num, title, desc }) => (
              <div key={num} style={{
                padding: '32px 20px',
                backgroundColor: 'rgba(15,36,60,0.6)',
                borderRight: `1px solid rgba(71,91,109,0.25)`,
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: C.rustOrange, fontFamily: 'var(--font-lato)', display: 'block', marginBottom: '12px' }}>
                  {num}
                </span>
                <div style={{ fontSize: '14px', fontWeight: 600, color: C.lightCream, fontFamily: 'var(--font-inter)', marginBottom: '10px' }}>
                  {title}
                </div>
                <div style={{ fontSize: '12px', color: C.stoneGray, fontFamily: 'var(--font-inter)', lineHeight: 1.65 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <SectionSep />

      {/* ══════════════════════════════════════
          4. COMO FUNCIONA
          bg: azurite
      ══════════════════════════════════════ */}
      <section id="como-funciona" className="section-pad" style={{ backgroundColor: C.azurite, padding: '96px 48px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <EyebrowLabel>Formato imersão</EyebrowLabel>
            <h2 style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700, color: C.lightCream, marginBottom: '24px',
            }}>
              São 4 horas para você reorganizar
              os pilares da sua operação.
            </h2>
            <Divider centered />
          </div>

          {/* Cronograma do evento */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px', marginBottom: '52px',
          }}>
            {[
              { hora: '14h00', title: 'Performance Humana',    desc: 'Seu time não sustenta o que não tem energia para executar' },
              { hora: '15h00', title: 'Liderança sob Pressão', desc: 'Parar de reagir e começar a estruturar comportamento' },
              { hora: '16h00', title: 'Comunicação e Cultura', desc: 'Onde a maioria dos problemas nasce e se repete' },
              { hora: '17h00', title: 'Estrutura e Execução',  desc: 'Sem isso, tudo volta ao mesmo lugar' },
            ].map(({ hora, title, desc }) => (
              <div key={hora} style={{
                padding: '36px 28px',
                backgroundColor: 'rgba(0,10,28,0.5)',
                border: `1px solid rgba(71,91,109,0.35)`,
                borderRadius: '3px',
                borderTop: `3px solid ${C.rustOrange}`,
              }}>
                <div style={{
                  display: 'inline-block',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em',
                  color: C.rustOrange, fontFamily: 'var(--font-inter)',
                  textTransform: 'uppercase', marginBottom: '20px',
                  padding: '4px 10px',
                  border: `1px solid rgba(153,79,36,0.35)`,
                  borderRadius: '100px',
                }}>
                  {hora}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: C.lightCream, fontFamily: 'var(--font-inter)', marginBottom: '12px', lineHeight: 1.3 }}>
                  {title}
                </div>
                <div style={{ fontSize: '14px', color: C.stoneGray, fontFamily: 'var(--font-inter)', lineHeight: 1.7 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>

          {/* O que você leva */}
          <div style={{
            marginBottom: '52px',
            padding: '40px 44px',
            border: `1px solid rgba(71,91,109,0.35)`,
            borderRadius: '4px',
            background: 'linear-gradient(135deg, rgba(15,36,60,0.6) 0%, rgba(0,10,28,0.85) 100%)',
          }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: C.rustOrange, fontFamily: 'var(--font-inter)', marginBottom: '28px',
            }}>
              O que você leva
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}>
              {[
                'Diagnóstico completo do seu time',
                'Checklist de liderança aplicado',
                'Recursos práticos de comunicação',
                'Acesso ao ecossistema Elo e-Health',
              ].map((item) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '18px 22px',
                  borderLeft: `3px solid ${C.rustOrange}`,
                  background: 'linear-gradient(90deg, rgba(153,79,36,0.07) 0%, rgba(15,36,60,0.4) 100%)',
                  borderRadius: '0 3px 3px 0',
                }}>
                  <span style={{ fontSize: '10px', color: C.rustOrange, flexShrink: 0 }}>◈</span>
                  <span style={{ fontSize: '15px', color: C.rusticCotton, fontFamily: 'var(--font-inter)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <CTAButton />
          </div>

        </div>
      </section>

      <SectionSep />

      {/* ══════════════════════════════════════
          5. PALESTRANTES
          bg: eloBlue
      ══════════════════════════════════════ */}
      <section id="palestrantes" className="section-pad" style={{ backgroundColor: C.eloBlue, padding: '96px 48px' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <EyebrowLabel>Quem conduz</EyebrowLabel>
            <h2 style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700, color: C.lightCream, marginBottom: '24px',
            }}>
              Conheça nossos mentores
            </h2>
            <Divider centered />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {mentores.map(({ nome, cargo, empresa, bio, img }) => (
              <div key={nome} style={{
                borderRadius: '4px', overflow: 'hidden',
                border: `1px solid rgba(71,91,109,0.4)`,
                backgroundColor: 'rgba(0,10,28,0.35)',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Imagem do mentor */}
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                  <Image
                    src={img}
                    alt={nome}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                {/* Info */}
                <div style={{ padding: '24px 20px' }}>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: C.lightCream, fontFamily: 'var(--font-inter)', marginBottom: '4px' }}>
                    {nome}
                  </div>
                  <div style={{ fontSize: '12px', color: C.rustOrange, fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {cargo}
                  </div>
                  <div style={{ fontSize: '12px', color: C.stoneGray, fontFamily: 'var(--font-inter)', marginBottom: '12px' }}>
                    {empresa}
                  </div>
                  <p style={{ fontSize: '13px', color: C.rusticCotton, fontFamily: 'var(--font-inter)', lineHeight: 1.65 }}>
                    {bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <SectionSep />

      {/* ══════════════════════════════════════
          6. INSCRIÇÃO
      ══════════════════════════════════════ */}
      <InscricaoSection />

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{
        backgroundColor: '#000510',
        borderTop: `1px solid rgba(71,91,109,0.2)`,
        padding: '40px 48px',
      }}>
        <div style={{
          maxWidth: '1060px', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Image
              src="/KV/KV%20Criativos%20GPS%20ELO%20PEOPLE/SELO/%5BELOEDUCACION%5DCriativo_GPSEloPeople-04.png"
              alt="GPS People"
              width={44}
              height={44}
              style={{ objectFit: 'contain', opacity: 0.75 }}
            />
            <div style={{ width: '1px', height: '20px', background: `linear-gradient(180deg, transparent, ${C.winterMetal}, transparent)` }} />
            <Image
              src="/logos/logo-eloeducation.png"
              alt="Elo Education"
              width={110}
              height={30}
              style={{ objectFit: 'contain', opacity: 0.6 }}
            />
          </div>
          <p style={{ fontSize: '12px', color: C.winterMetal, fontFamily: 'var(--font-inter)', letterSpacing: '0.04em' }}>
            © 2026 Elo Education · Todos os direitos reservados
          </p>
        </div>
      </footer>

    </>
  );
}
