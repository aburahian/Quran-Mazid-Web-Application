'use client';

import { useAudio } from '@/store/AudioContext';

export default function PlayerBar() {
  const { isPlaying, isLoading, playingAyahKey, togglePlay, stop, currentUrl } = useAudio();

  if (!currentUrl) return null;

  return (
    <div
      id="player-bar"
      className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up glass flex flex-col md:flex-row items-center justify-between px-6 py-4 md:pb-[max(1rem,env(safe-area-inset-bottom))] mb-[calc(3.5rem+env(safe-area-inset-bottom))] md:mb-0"
      style={{
        borderColor: 'var(--glass-border)',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Left: Ayah Info */}
      <div className="flex items-center gap-3 mb-2 md:mb-0 w-full md:w-auto">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
            Reciting
          </p>
          <p className="text-sm font-medium text-white truncate">
            {playingAyahKey ? `Ayah ${playingAyahKey}` : 'Quran Recitation'}
          </p>
        </div>
      </div>

      {/* Middle: Controls */}
      <div className="flex items-center gap-4">
        {/* Previous (decorative) */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full" style={{ color: 'var(--text-muted)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full transition-transform active:scale-90"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          {isLoading ? (
            <svg className="animate-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Next (decorative) */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full" style={{ color: 'var(--text-muted)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={stop}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-[var(--bg-hover)]"
          style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
        >
          Stop & Close
        </button>
      </div>

      {/* Mobile Stop Button */}
      <button 
        onClick={stop}
        className="md:hidden absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/20"
        style={{ color: 'var(--text-muted)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
