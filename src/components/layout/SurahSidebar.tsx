'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useApp } from '@/store/AppContext';
import { getAllSurahs } from '@/lib/quranData';
import type { Surah } from '@/types';

export default function SurahSidebar({ className = '' }: { className?: string }) {
  const { activeSurahId, setActiveSurah, isSurahSidebarOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const surahs = getAllSurahs();

  const filteredSurahs = useMemo(() => {
    if (!searchQuery.trim()) return surahs;
    const q = searchQuery.toLowerCase().trim();
    return surahs.filter(
      s =>
        s.nameEnglish.toLowerCase().includes(q) ||
        s.nameMeaning.toLowerCase().includes(q) ||
        s.nameArabic.includes(searchQuery.trim()) ||
        String(s.id).includes(q)
    );
  }, [surahs, searchQuery]);

  if (!isSurahSidebarOpen) return null;

  return (
    <aside
      id="surah-sidebar"
      className={`hidden md:flex flex-col border-r overflow-hidden ${className}`}
      style={{
        width: 'var(--surah-sidebar-width)',
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex border-b" style={{ borderColor: 'var(--border-color)' }}>
        {['Surah', 'Juz', 'Page'].map((tab, i) => (
          <button
            key={tab}
            className="flex-1 py-2.5 text-sm font-medium transition-colors"
            style={{
              color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
              backgroundColor: i === 0 ? 'var(--bg-surface)' : 'transparent',
              borderBottom: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            style={{ color: 'var(--text-muted)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search Surah"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredSurahs.map(surah => (
          <SurahItem
            key={surah.id}
            surah={surah}
            isActive={surah.id === activeSurahId}
            onSelect={setActiveSurah}
          />
        ))}
      </div>
    </aside>
  );
}

function SurahItem({
  surah,
  isActive,
  onSelect,
}: {
  surah: Surah;
  isActive: boolean;
  onSelect: (id: number) => void;
}) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      onClick={() => onSelect(surah.id)}
      className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-[var(--bg-hover)] cursor-pointer"
      style={{
        backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
      }}
    >
      <div className={`surah-number ${isActive ? 'active' : ''}`}>
        <span>{surah.id}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}
        >
          {surah.nameEnglish}
        </p>
        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
          {surah.nameMeaning}
        </p>
      </div>

      <span
        className="text-sm font-amiri hidden lg:block"
        style={{ color: 'var(--text-muted)', direction: 'rtl' }}
      >
        {surah.nameArabic}
      </span>
    </Link>
  );
}
