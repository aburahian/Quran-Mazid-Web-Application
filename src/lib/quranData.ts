import { Surah, Ayah, SearchResult } from '@/types';
import surahsData from '@/data/surahs.json';
import arabicData from '@/data/quran-arabic.json';
import translationData from '@/data/quran-translation.json';
import ayahOffsetMap from '@/data/ayah-offset-map.json';
import { AUDIO_CDN_BASE } from './constants';

const API_BASE_URL = '/api';

const surahs: Surah[] = surahsData as Surah[];
const arabic = arabicData as Record<string, Array<{ ayah: number; text: string }>>;
const translations = translationData as Record<string, Array<{ ayah: number; text: string }>>;
const offsets = ayahOffsetMap as Record<string, number>;

export function getAllSurahs(): Surah[] {
  return surahs;
}

export function getSurahById(id: number): Surah | undefined {
  return surahs.find(s => s.id === id);
}

export function getAyahsForSurah(surahId: number): Ayah[] {
  const arabicAyahs = arabic[String(surahId)] || [];
  const englishAyahs = translations[String(surahId)] || [];

  return arabicAyahs.map((a, index) => ({
    surahId,
    ayahNumber: a.ayah,
    textArabic: a.text,
    textEnglish: englishAyahs[index]?.text || '',
  }));
}

export function getAbsoluteAyahNumber(surahId: number, ayahNumber: number): number {
  const offset = offsets[String(surahId)] || 0;
  return offset + ayahNumber;
}

export function getAyahAudioUrl(surahId: number, ayahNumber: number): string {
  const absoluteNumber = getAbsoluteAyahNumber(surahId, ayahNumber);
  return `${AUDIO_CDN_BASE}/${absoluteNumber}.mp3`;
}

function normalizeArabic(text: string): string {
  // eslint-disable-next-line no-control-regex
  return text.replace(/[\u064B-\u065F\u0670]/g, '');
}

export async function searchAyahs(query: string, limit: number = 50): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    if (!res.ok) throw new Error('Search failed');
    
    const data = await res.json();
    return data.results.map((r: any) => ({
      surahId: r.surah_id,
      surahNameEnglish: r.surah_name_english,
      ayahNumber: r.ayah_number,
      textArabic: r.text_arabic,
      textEnglish: r.text_english,
      matchType: r.match_type,
    }));
  } catch (e) {
    console.error('Backend search failed, falling back to client-side (limited):', e);
    // Fallback logic could go here if needed, but for now we expect the backend to be up
    return [];
  }
}

export function getAllSurahIds(): number[] {
  return surahs.map(s => s.id);
}
