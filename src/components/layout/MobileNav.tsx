'use client';

import { useApp } from '@/store/AppContext';

const navItems = [
  {
    id: 'home',
    label: 'Home',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'surahs',
    label: 'Surahs',
    action: 'drawer' as const,
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'share',
    label: 'Share',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 'bookmark',
    label: 'Bookmarks',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    action: 'settings' as const,
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

export default function MobileNav() {
  const { toggleMobileDrawer, openSettings } = useApp();

  const handleClick = (item: typeof navItems[0]) => {
    if (item.action === 'drawer') {
      toggleMobileDrawer();
    } else if (item.action === 'settings') {
      openSettings();
    }
  };

  return (
    <nav
      id="mobile-nav"
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] border-t md:hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          {item.svg}
          <span className="text-[10px]">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
