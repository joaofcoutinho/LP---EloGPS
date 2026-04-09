'use client';

const C = {
  winterMetal: '#475B6D',
  stoneGray:   '#7A8790',
  rustOrange:  '#994F24',
  auLait:      '#C3AF94',
  lightCream:  '#E6DBCE',
};

const cargoLabel: Record<string, string> = {
  gestor_clinica:     'Gestor(a) de Clínica',
  diretor_hospital:   'Diretor(a) de Hospital',
  coordenador:        'Coordenador(a)',
  socio_proprietario: 'Sócio / Proprietário',
  outro:              'Outro',
};

export interface Lead {
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  cargo: string | null;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const total = leads.length;

  if (total === 0) {
    return (
      <div style={{ padding: '80px 28px', textAlign: 'center', color: C.stoneGray, fontSize: '15px' }}>
        Nenhum lead captado ainda. Aguardando inscrições.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
            {['#', 'Nome', 'E-mail', 'WhatsApp', 'Cargo', 'Data / Hora'].map(col => (
              <th
                key={col}
                style={{
                  padding: '12px 20px',
                  textAlign: 'left',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: C.stoneGray,
                  borderBottom: `1px solid ${C.winterMetal}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <LeadRow key={lead.id} lead={lead} idx={idx} total={total} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeadRow({ lead, idx, total }: { lead: Lead; idx: number; total: number }) {
  const baseBg = idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)';

  return (
    <tr
      style={{ borderBottom: '1px solid rgba(71,91,109,0.35)', backgroundColor: baseBg, transition: 'background-color 0.15s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'rgba(153,79,36,0.07)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = baseBg; }}
    >
      <td style={{ padding: '14px 20px', color: C.stoneGray, fontSize: '12px' }}>
        {total - idx}
      </td>
      <td style={{ padding: '14px 20px', color: C.lightCream, fontSize: '14px', fontWeight: 500 }}>
        {lead.nome}
      </td>
      <td style={{ padding: '14px 20px', fontSize: '13px' }}>
        <a href={`mailto:${lead.email}`} style={{ color: C.auLait, textDecoration: 'none' }}>
          {lead.email}
        </a>
      </td>
      <td style={{ padding: '14px 20px', fontSize: '13px' }}>
        <a
          href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: C.auLait, textDecoration: 'none' }}
        >
          {lead.whatsapp}
        </a>
      </td>
      <td style={{ padding: '14px 20px' }}>
        {lead.cargo ? (
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em',
            backgroundColor: 'rgba(153,79,36,0.15)', color: C.auLait,
            border: '1px solid rgba(153,79,36,0.3)',
          }}>
            {cargoLabel[lead.cargo] ?? lead.cargo}
          </span>
        ) : (
          <span style={{ color: C.stoneGray, fontSize: '12px' }}>—</span>
        )}
      </td>
      <td style={{ padding: '14px 20px', color: C.stoneGray, fontSize: '12px', whiteSpace: 'nowrap' }}>
        {formatDate(lead.created_at)}
      </td>
    </tr>
  );
}
