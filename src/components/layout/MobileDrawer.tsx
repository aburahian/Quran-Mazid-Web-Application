'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useApp } from '@/store/AppContext';
import { getAllSurahs } from '@/lib/quranData';
import type { Surah } from '@/types';

export default function MobileDrawer() {
  const { isMobileDrawerOpen, closeMobileDrawer, activeSurahId, setActiveSurah } = useApp();
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

  if (!isMobileDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 animate-fade-in md:hidden"
        onClick={closeMobileDrawer}
      />

      {/* Drawer */}
      <div
        className="fixed left-0 top-0 bottom-0 z-50 flex flex-col animate-slide-left md:hidden"
        style={{
          width: '85vw',
          maxWidth: '360px',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Q
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Quran Mazid</h2>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                Read, Study, and Learn The Quran
              </p>
            </div>
          </div>
          <button
            onClick={closeMobileDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: 'var(--border-color)' }}>
          {['Surah', 'Juz', 'Page'].map((tab, i) => (
            <button
              key={tab}
              className="flex-1 py-2.5 text-sm font-medium"
              style={{
                color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottom: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="p-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ backgroundColor: 'var(--bg-surface)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
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

        {/* Surah List */}
        <div className="flex-1 overflow-y-auto">
          {filteredSurahs.map(surah => (
            <MobileSurahItem
              key={surah.id}
              surah={surah}
              isActive={surah.id === activeSurahId}
              onSelect={(id) => {
                setActiveSurah(id);
                closeMobileDrawer();
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function MobileSurahItem({ surah, isActive, onSelect }: { surah: Surah; isActive: boolean; onSelect: (id: number) => void }) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      onClick={() => onSelect(surah.id)}
      className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--bg-hover)]"
      style={{
        backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
      }}
    >
      <div className={`surah-number ${isActive ? 'active' : ''}`}>
        <span>{surah.id}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}>
          {surah.nameEnglish}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {surah.nameMeaning}
        </p>
      </div>
      <span className="text-base font-amiri" style={{ color: 'var(--text-muted)', direction: 'rtl' }}>
        {surah.nameArabic}
      </span>
    </Link>
  );
}
