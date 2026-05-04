'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontSettings } from '@/types';
import { DEFAULT_FONT_SETTINGS, SETTINGS_STORAGE_KEY } from '@/lib/constants';

export function useSettings() {
  const [settings, setSettings] = useState<FontSettings>(DEFAULT_FONT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FontSettings;
        setSettings(parsed);
      }
    } catch {
      // Use defaults
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      } catch {
        // Silently fail
      }
    }
  }, [settings, isLoaded]);

  // Apply theme to document element
  useEffect(() => {
    if (isLoaded) {
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
  }, [settings.theme, isLoaded]);

  const setArabicFont = useCallback((font: FontSettings['arabicFont']) => {
    setSettings(prev => ({ ...prev, arabicFont: font }));
  }, []);

  const setArabicSize = useCallback((size: number) => {
    setSettings(prev => ({ ...prev, arabicSize: Math.min(50, Math.max(18, size)) }));
  }, []);

  const setTranslationSize = useCallback((size: number) => {
    setSettings(prev => ({ ...prev, translationSize: Math.min(28, Math.max(12, size)) }));
  }, []);

  const setTheme = useCallback((theme: 'dark' | 'light') => {
    setSettings(prev => ({ ...prev, theme }));
  }, []);

  return {
    settings,
    isLoaded,
    setArabicFont,
    setArabicSize,
    setTranslationSize,
    setTheme,
  };
}
