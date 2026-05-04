'use client';

import { useEffect } from 'react';
import { useApp } from '@/store/AppContext';
import SurahHeader from '@/components/quran/SurahHeader';
import AyahList from '@/components/quran/AyahList';
import type { Surah, Ayah } from '@/types';

interface SurahPageClientProps {
  surah: Surah;
  ayahs: Ayah[];
}

export default function SurahPageClient({ surah, ayahs }: SurahPageClientProps) {
  const { setActiveSurah } = useApp();

  useEffect(() => {
    setActiveSurah(surah.id);
  }, [surah.id, setActiveSurah]);

  return (
    <div className="animate-fade-in">
      <SurahHeader surah={surah} ayahs={ayahs} />
      <AyahList ayahs={ayahs} surahId={surah.id} />
    </div>
  );
}
