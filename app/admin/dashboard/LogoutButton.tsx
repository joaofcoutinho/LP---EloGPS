'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 20px',
        backgroundColor: 'transparent',
        border: '1px solid #475B6D',
        borderRadius: '4px',
        color: '#7A8790',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        fontFamily: 'var(--font-inter)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#994F24';
        (e.currentTarget as HTMLButtonElement).style.color = '#C3AF94';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#475B6D';
        (e.currentTarget as HTMLButtonElement).style.color = '#7A8790';
      }}
    >
      Sair
    </button>
  );
}
