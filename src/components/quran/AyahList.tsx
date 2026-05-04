'use client';

import type { Ayah } from '@/types';
import AyahCard from './AyahCard';
import { useSettings } from '@/hooks/useSettings';
import { useAudio } from '@/store/AudioContext';

interface AyahListProps {
  ayahs: Ayah[];
  surahId: number;
}

export default function AyahList({ ayahs, surahId }: AyahListProps) {
  const { settings } = useSettings();
  const { play, playingAyahKey, isPlaying, isLoading } = useAudio();

  return (
    <div id="ayah-list" className="pb-24 md:pb-8">
      {/* Bismillah - show for all surahs except Al-Fatihah (1) and At-Tawbah (9) */}
      {surahId !== 1 && surahId !== 9 && (
        <div className="text-center py-6 px-4">
          <p
            className="font-kfgqpc arabic-text text-center"
            style={{
              fontSize: `${settings.arabicSize + 4}px`,
              color: 'var(--text-primary)',
              direction: 'rtl',
              lineHeight: 2,
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <hr className="ayah-separator mx-6 mt-4" />
        </div>
      )}

      {/* Ayah Cards */}
      {ayahs.map(ayah => {
        const key = `${ayah.surahId}:${ayah.ayahNumber}`;
        const isCurrentPlaying = playingAyahKey === key && isPlaying;
        const isCurrentLoading = playingAyahKey === key && isLoading;

        return (
          <AyahCard
            key={key}
            ayah={ayah}
            settings={settings}
            isPlaying={isCurrentPlaying}
            isLoading={isCurrentLoading}
            onPlay={play}
          />
        );
      })}
    </div>
  );
}
