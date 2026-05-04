'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/store/AppContext';

const icons = [
  {
    id: 'home',
    label: 'Home',
    href: '/surah/1',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'surahs',
    label: 'Surahs',
    action: 'toggleSidebar',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 'bookmark',
    label: 'Bookmark',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    action: 'toggleSettings',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

export default function IconSidebar() {
  const pathname = usePathname();
  const { toggleSurahSidebar, openSettings } = useApp();

  const handleClick = (icon: typeof icons[0]) => {
    if (icon.action === 'toggleSidebar') {
      toggleSurahSidebar();
    } else if (icon.action === 'toggleSettings') {
      openSettings();
    }
  };

  return (
    <aside
      id="icon-sidebar"
      className="fixed left-0 top-0 bottom-0 z-30 hidden md:flex flex-col items-center py-4 gap-1 glass"
      style={{
        width: 'var(--sidebar-width)',
        borderColor: 'var(--glass-border)',
      }}
    >
      <div className="mb-6 p-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Q
        </div>
      </div>

      <nav className="flex flex-col items-center gap-1 flex-1">
        {icons.map(icon => {
          const isActive = icon.href && pathname?.startsWith(icon.href);

          if (icon.href) {
            return (
              <Link
                key={icon.id}
                href={icon.href}
                title={icon.label}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[var(--bg-hover)]"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                }}
              >
                {icon.svg}
              </Link>
            );
          }

          return (
            <button
              key={icon.id}
              title={icon.label}
              onClick={() => handleClick(icon)}
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[var(--bg-hover)]"
              style={{ color: 'var(--text-muted)' }}
            >
              {icon.svg}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
