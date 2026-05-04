export interface Surah {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  nameMeaning: string;
  totalAyahs: number;
  revelationType: 'Makkah' | 'Madinah';
}

export interface Ayah {
  surahId: number;
  ayahNumber: number;
  textArabic: string;
  textEnglish: string;
}

export interface FontSettings {
  arabicFont: 'amiri' | 'scheherazade' | 'kfgqpc';
  arabicSize: number;
  translationSize: number;
  theme: 'dark' | 'light';
}

export interface SearchResult {
  surahId: number;
  surahNameEnglish: string;
  ayahNumber: number;
  textArabic: string;
  textEnglish: string;
  matchType: 'arabic' | 'english';
}

export type ArabicFontOption = {
  id: 'amiri' | 'scheherazade' | 'kfgqpc';
  name: string;
  className: string;
};
