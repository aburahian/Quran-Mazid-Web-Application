import { Metadata } from 'next';
import { getAllSurahIds, getSurahById, getAyahsForSurah } from '@/lib/quranData';
import SurahPageClient from './SurahPageClient';

export async function generateStaticParams() {
  return getAllSurahIds().map(id => ({
    id: String(id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const surahId = parseInt(id, 10);
  const surah = getSurahById(surahId);

  if (!surah) {
    return { title: 'Surah Not Found — Quran Mazid' };
  }

  return {
    title: `Surah ${surah.nameEnglish} (${String(surah.id).padStart(2, '0')}) — Arabic, English Translation & Recitation | ${surah.nameArabic}`,
    description: `Read Surah ${surah.nameEnglish} (${surah.nameArabic}) — ${surah.nameMeaning}. ${surah.totalAyahs} ayahs, revealed in ${surah.revelationType}. Arabic text with Sahih International English translation and audio recitation.`,
    openGraph: {
      title: `Surah ${surah.nameEnglish} — ${surah.nameArabic}`,
      description: `${surah.nameMeaning} — ${surah.totalAyahs} ayahs, ${surah.revelationType}`,
    },
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahId = parseInt(id, 10);
  const surah = getSurahById(surahId);

  if (!surah) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Surah Not Found
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            The surah you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const ayahs = getAyahsForSurah(surahId);

  return <SurahPageClient surah={surah} ayahs={ayahs} />;
}
