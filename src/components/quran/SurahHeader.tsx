'use client';

import type { Surah, Ayah } from '@/types';
import { useAudio } from '@/store/AudioContext';
import { getAyahAudioUrl } from '@/lib/quranData';

interface SurahHeaderProps {
  surah: Surah;
  ayahs: Ayah[];
}

export default function SurahHeader({ surah, ayahs }: SurahHeaderProps) {
  const { playPlaylist, isPlaying, stop } = useAudio();

  const handlePlayFullSurah = () => {
    const items = ayahs.map(a => ({
      url: getAyahAudioUrl(a.surahId, a.ayahNumber),
      key: `${a.surahId}:${a.ayahNumber}`,
    }));
    playPlaylist(items);
  };

  return (
    <div
      id="surah-header"
      className="relative overflow-hidden rounded-xl mx-4 mt-4 mb-6"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute left-0 top-0 w-36 h-full bg-contain bg-no-repeat bg-left"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23334155;stop-opacity:0.5'/%3E%3Cstop offset='100%25' style='stop-color:%23334155;stop-opacity:0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='80' r='30' fill='%23475569' opacity='0.3'/%3E%3Ccircle cx='80' cy='40' r='20' fill='%23475569' opacity='0.2'/%3E%3Ccircle cx='60' cy='120' r='25' fill='%23475569' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Mosque silhouette placeholder */}
        <div className="absolute left-2 bottom-0 w-32 h-24">
          <svg viewBox="0 0 120 80" fill="none" className="w-full h-full opacity-40">
            <path d="M10 80 L10 40 Q30 15 50 40 L50 80Z" fill="#4a5568" />
            <path d="M30 80 L30 35 Q50 10 70 35 L70 80Z" fill="#4a5568" />
            <path d="M55 80 L55 45 Q70 25 85 45 L85 80Z" fill="#4a5568" />
            <rect x="45" y="50" width="4" height="30" fill="#4a5568" opacity="0.6" />
            <rect x="25" y="20" width="3" height="15" fill="#4a5568" opacity="0.5" />
            <circle cx="26.5" cy="18" r="3" fill="#4a5568" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-10 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Surah {surah.nameEnglish}
        </h2>
        <p className="text-sm md:text-base font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>
          {surah.nameMeaning} • {surah.totalAyahs} Ayahs • {surah.revelationType}
        </p>

        {/* Play Button */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handlePlayFullSurah}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95 shadow-lg"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Play Full Surah
          </button>
        </div>
      </div>
    </div>
  );
}
