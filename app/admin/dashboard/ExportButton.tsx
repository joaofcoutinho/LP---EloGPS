'use client';

interface Lead {
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  cargo: string | null;
  created_at: string;
}

const cargoLabel: Record<string, string> = {
  gestor_clinica:     'Gestor(a) de Clínica',
  diretor_hospital:   'Diretor(a) de Hospital',
  coordenador:        'Coordenador(a)',
  socio_proprietario: 'Sócio / Proprietário',
  outro:              'Outro',
};

export default function ExportButton({ leads }: { leads: Lead[] }) {
  function handleExport() {
    const header = ['ID', 'Nome', 'E-mail', 'WhatsApp', 'Cargo', 'Data/Hora'];
    const rows = leads.map(l => [
      l.id,
      `"${l.nome}"`,
      l.email,
      l.whatsapp,
      l.cargo ? (cargoLabel[l.cargo] ?? l.cargo) : '',
      new Date(l.created_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    ]);

    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-gps-people-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      style={{
        padding: '8px 20px',
        backgroundColor: '#994F24',
        border: 'none',
        borderRadius: '4px',
        color: '#E6DBCE',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        fontFamily: 'var(--font-inter)',
        transition: 'background-color 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7a3d1a';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#994F24';
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Exportar CSV
    </button>
  );
}
