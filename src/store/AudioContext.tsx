'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface AudioContextType {
  play: (url: string, key: string) => void;
  playPlaylist: (items: { url: string; key: string }[]) => void;
  pause: () => void;
  stop: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  isLoading: boolean;
  playingAyahKey: string | null;
  currentUrl: string | null;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playingAyahKey, setPlayingAyahKey] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<{ url: string; key: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // ... sync state with audio element (unchanged handle functions) ...
  const handlePlaying = () => { setIsPlaying(true); setIsLoading(false); };
  const handlePause = () => { setIsPlaying(false); };
  const handleWaiting = () => { setIsLoading(true); };
  const handleError = () => { setIsPlaying(false); setIsLoading(false); setPlayingAyahKey(null); };

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // ... handle auto-play of next item (unchanged handleEnded) ...
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setPlayingAyahKey(null);
      
      if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        const nextItem = playlist[nextIndex];
        
        setIsLoading(true);
        setCurrentUrl(nextItem.url);
        setPlayingAyahKey(nextItem.key);
        audio.src = nextItem.url;
        audio.play().catch(() => {
          setIsLoading(false);
          setPlayingAyahKey(null);
        });
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentIndex, playlist]);

  const play = useCallback((url: string, ayahKey: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentUrl === url && isPlaying) {
      audio.pause();
      return;
    }

    if (currentUrl === url && !isPlaying) {
      audio.play();
      return;
    }

    setPlaylist([]);
    setCurrentIndex(-1);

    setIsLoading(true);
    setCurrentUrl(url);
    setPlayingAyahKey(ayahKey);
    audio.src = url;
    audio.play().catch(() => {
      setIsLoading(false);
      setPlayingAyahKey(null);
    });
  }, [currentUrl, isPlaying]);

  const playPlaylist = useCallback((items: { url: string; key: string }[]) => {
    const audio = audioRef.current;
    if (!audio || items.length === 0) return;

    setPlaylist(items);
    setCurrentIndex(0);
    
    const firstItem = items[0];
    setIsLoading(true);
    setCurrentUrl(firstItem.url);
    setPlayingAyahKey(firstItem.key);
    audio.src = firstItem.url;
    audio.play().catch(() => {
      setIsLoading(false);
      setPlayingAyahKey(null);
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentUrl(null);
    setPlayingAyahKey(null);
    setPlaylist([]);
    setCurrentIndex(-1);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentUrl) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [isPlaying, currentUrl]);

  return (
    <AudioContext.Provider value={{ play, playPlaylist, pause, stop, togglePlay, isPlaying, isLoading, playingAyahKey, currentUrl }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
