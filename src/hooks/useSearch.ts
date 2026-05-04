'use client';

import { useState, useCallback, useRef } from 'react';
import { SearchResult } from '@/types';
import { searchAyahs } from '@/lib/quranData';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((q: string) => {
    setQuery(q);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!q.trim() || q.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const found = await searchAyahs(q, 30);
        setResults(found);
      } catch (e) {
        console.error('Search error:', e);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsSearching(false);
  }, []);

  return {
    query,
    results,
    isSearching,
    search,
    clearSearch,
  };
}
