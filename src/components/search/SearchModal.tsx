'use client';

import { useApp } from '@/store/AppContext';
import { useSearch } from '@/hooks/useSearch';
import Link from 'next/link';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, setActiveSurah } = useApp();
  const { query, results, isSearching, search, clearSearch } = useSearch();

  if (!isSearchOpen) return null;

  const handleResultClick = (surahId: number) => {
    setActiveSurah(surahId);
    clearSearch();
    closeSearch();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={() => { clearSearch(); closeSearch(); }}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 animate-slide-up">
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div
              className="w-7 h-7 rounded flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Find wisdom in the Quran"
              value={query}
              onChange={e => search(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-base"
              style={{ color: 'var(--text-primary)' }}
              autoFocus
            />
            {query && (
              <button
                onClick={clearSearch}
                className="shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Quick Nav (when no query) */}
          {!query && (
            <div className="p-5">
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                Try to navigate
              </p>
              <div className="flex flex-wrap gap-2">
                {['Al-Fatiha', 'Juz 30', 'Surah Yasin', 'Page 1'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => search(chip.replace('Surah ', '').replace('Al-', 'Al '))}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-[var(--bg-hover)]"
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <p className="text-xs font-medium mt-5 mb-2" style={{ color: 'var(--text-muted)' }}>
                Recent Navigation
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                No recent navigation
              </p>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="max-h-[50vh] overflow-y-auto">
              {isSearching && (
                <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>
                  <svg className="animate-spin mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Searching...
                </div>
              )}

              {!isSearching && results.length === 0 && query.length >= 2 && (
                <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>
                  No results found for &quot;{query}&quot;
                </div>
              )}

              {!isSearching && results.map((result, i) => (
                <Link
                  key={`${result.surahId}-${result.ayahNumber}-${i}`}
                  href={`/surah/${result.surahId}#ayah-${result.surahId}:${result.ayahNumber}`}
                  onClick={() => handleResultClick(result.surahId)}
                  className="block px-5 py-3 transition-colors hover:bg-[var(--bg-hover)] border-b"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--accent)' }}>
                        {result.surahNameEnglish} — {result.surahId}:{result.ayahNumber}
                      </p>
                      
                      {result.matchType === 'arabic' ? (
                        <p 
                          className="text-lg mb-1 arabic-text font-kfgqpc text-right" 
                          dir="rtl"
                          style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}
                        >
                          {result.textArabic}
                        </p>
                      ) : null}

                      <p
                        className="text-sm line-clamp-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {result.textEnglish}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
