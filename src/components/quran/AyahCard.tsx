'use client';

import type { Ayah } from '@/types';
import type { FontSettings } from '@/types';
import { ARABIC_FONTS } from '@/lib/constants';
import { getAyahAudioUrl } from '@/lib/quranData';

interface AyahCardProps {
  ayah: Ayah;
  settings: FontSettings;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (url: string, key: string) => void;
}

export default function AyahCard({ ayah, settings, isPlaying, isLoading, onPlay }: AyahCardProps) {
  const ayahKey = `${ayah.surahId}:${ayah.ayahNumber}`;
  const audioUrl = getAyahAudioUrl(ayah.surahId, ayah.ayahNumber);
  const fontClass = ARABIC_FONTS.find(f => f.id === settings.arabicFont)?.className || 'font-kfgqpc';

  return (
    <article
      id={`ayah-${ayahKey}`}
      className="animate-slide-up"
      style={{ animationDelay: `${Math.min(ayah.ayahNumber * 30, 300)}ms`, animationFillMode: 'both' }}
    >
      <div
        className="flex gap-4 md:gap-6 px-5 md:px-8 py-8 transition-all duration-300 group hover:bg-[var(--bg-hover)]"
        style={{
          backgroundColor: isPlaying ? 'var(--accent-light)' : 'transparent',
        }}
      >
        {/* Left Action Gutter */}
        <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
          {/* Verse Number */}
          <span className="verse-badge">{ayahKey}</span>

          {/* Play Button */}
          <button
            onClick={() => onPlay(audioUrl, ayahKey)}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--accent-light)]"
            style={{ color: isPlaying ? 'var(--accent)' : 'var(--text-muted)' }}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Copy Button */}
          <button
            onClick={() => {
              navigator.clipboard?.writeText(`${ayah.textArabic}\n\n${ayah.textEnglish}\n\n— ${ayahKey}`);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-muted)' }}
            title="Copy"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>

          {/* Bookmark Button */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-muted)' }}
            title="Bookmark"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          {/* More */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-muted)' }}
            title="More"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {/* Arabic Text */}
          <div
            className={`arabic-text ${fontClass} mb-4 leading-loose`}
            style={{ fontSize: `${settings.arabicSize}px`, lineHeight: 2.2 }}
          >
            {ayah.textArabic}
            {' '}
            <span className="inline-flex items-center justify-center w-8 h-8 text-xs rounded-full border opacity-50" style={{ borderColor: 'var(--text-muted)', fontSize: '10px' }}>
              {ayah.ayahNumber}
            </span>
          </div>

          {/* Translation Source Label */}
          <p
            className="text-[11px] font-medium tracking-widest uppercase mb-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            SAHEEH INTERNATIONAL
          </p>

          {/* English Translation */}
          <p
            className="leading-relaxed"
            style={{
              fontSize: `${settings.translationSize}px`,
              color: 'var(--text-secondary)',
            }}
          >
            {ayah.textEnglish}
          </p>
        </div>
      </div>

      {/* Separator */}
      <hr className="ayah-separator mx-6" />
    </article>
  );
}
