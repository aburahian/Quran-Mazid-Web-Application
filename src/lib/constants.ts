import { ArabicFontOption, FontSettings } from '@/types';

export const AUDIO_CDN_BASE = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy';

export const DEFAULT_FONT_SETTINGS: FontSettings = {
  arabicFont: 'kfgqpc',
  arabicSize: 30,
  translationSize: 17,
  theme: 'dark',
};

export const ARABIC_FONTS: ArabicFontOption[] = [
  { id: 'kfgqpc', name: 'KFGQPC', className: 'font-kfgqpc' },
  { id: 'amiri', name: 'Amiri', className: 'font-amiri' },
  { id: 'scheherazade', name: 'Scheherazade', className: 'font-scheherazade' },
];

export const SETTINGS_STORAGE_KEY = 'quran-app-settings';

export const TOTAL_AYAHS_IN_QURAN = 6236;
