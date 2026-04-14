import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sql, ensureLeadsTable } from '../../lib/db';
import LogoutButton from './LogoutButton';
import ExportButton from './ExportButton';
import LeadsTable, { type Lead } from './LeadsTable';

const C = {
  eloBlue:     '#00192B',
  azurite:     '#0F243C',
  winterMetal: '#475B6D',
  stoneGray:   '#7A8790',
  rustOrange:  '#994F24',
  auLait:      '#C3AF94',
  lightCream:  '#E6DBCE',
  denimDive:   '#000A1C',
};

export default async function DashboardPage() {
  /* ── Auth check ── */
  const store = await cookies();
  const token = store.get('elo_admin')?.value;
  if (token !== process.env.ADMIN_TOKEN) {
    redirect('/admin');
  }

  /* ── Fetch leads ── */
  await ensureLeadsTable();
  const leads = (await sql`
    SELECT id, nome, email, whatsapp, cargo, cupom, created_at
    FROM leads
    ORDER BY created_at DESC
  `) as Lead[];

  const total = leads.length;

  const hoje = leads.filter(l => {
    const d = new Date(l.created_at);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  const cargoCount = leads.reduce<Record<string, number>>((acc, l) => {
    const c = l.cargo || 'outro';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  const cargoLabel: Record<string, string> = {
    gestor_clinica:     'Gestor(a) de Clínica',
    diretor_hospital:   'Diretor(a) de Hospital',
    coordenador:        'Coordenador(a)',
    socio_proprietario: 'Sócio / Proprietário',
    outro:              'Outro',
  };

  const topCargo = Object.entries(cargoCount).sort((a, b) => b[1] - a[1])[0];
  const comCupom = leads.filter(l => l.cupom).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.eloBlue, fontFamily: 'var(--font-inter)' }}>

      {/* ── Header ── */}
      <header style={{
        backgroundColor: C.denimDive,
        borderBottom: `1px solid ${C.winterMetal}`,
        padding: '0 40px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.rustOrange }}>
            Elo Education
          </span>
          <span style={{ color: C.winterMetal, margin: '0 10px' }}>·</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: C.lightCream, letterSpacing: '0.06em' }}>
            GPS People — Painel de Leads
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ExportButton leads={leads} />
          <LogoutButton />
        </div>
      </header>

      <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* ── Eyebrow ── */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.rustOrange, marginBottom: '8px' }}>
            Evento · 24 de Abril de 2026
          </p>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: C.lightCream, fontFamily: 'var(--font-lato)', letterSpacing: '0.02em' }}>
            Captação de Leads
          </h1>
          <div style={{ width: '48px', height: '2px', background: `linear-gradient(90deg, ${C.rustOrange}, ${C.auLait})`, marginTop: '14px' }} />
        </div>

        {/* ── Stats cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          <StatCard label="Total de leads" value={total} accent={C.rustOrange} />
          <StatCard label="Captados hoje" value={hoje} accent={C.auLait} />
          <StatCard label="Com cupom" value={comCupom} sub={total > 0 ? `${Math.round(comCupom / total * 100)}% do total` : ''} accent={C.rustOrange} />
          <StatCard
            label="Cargo predominante"
            value={topCargo ? (cargoLabel[topCargo[0]] ?? topCargo[0]) : '—'}
            sub={topCargo ? `${topCargo[1]} cadastro${topCargo[1] > 1 ? 's' : ''}` : ''}
            accent={C.winterMetal}
            small
          />
        </div>

        {/* ── Table ── */}
        <div style={{
          backgroundColor: C.azurite,
          border: `1px solid ${C.winterMetal}`,
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 28px',
            borderBottom: `1px solid ${C.winterMetal}`,
          }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: C.lightCream, letterSpacing: '0.04em' }}>
              {total} lead{total !== 1 ? 's' : ''} registrado{total !== 1 ? 's' : ''}
            </span>
          </div>

          <LeadsTable leads={leads} />
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '11px', color: C.winterMetal, letterSpacing: '0.08em' }}>
          GPS People · Elo Education — Painel restrito ao administrador
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label, value, sub, accent, small = false,
}: {
  label: string; value: string | number; sub?: string; accent: string; small?: boolean;
}) {
  return (
    <div style={{
      backgroundColor: '#0F243C',
      border: '1px solid #475B6D',
      borderRadius: '8px',
      padding: '28px 28px 24px',
      borderTop: `3px solid ${accent}`,
    }}>
      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8790', marginBottom: '12px' }}>
        {label}
      </p>
      <p style={{ fontSize: small ? '20px' : '40px', fontWeight: 700, color: accent, fontFamily: 'var(--font-lato)', lineHeight: 1 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: '12px', color: '#7A8790', marginTop: '6px' }}>{sub}</p>}
    </div>
  );
}
