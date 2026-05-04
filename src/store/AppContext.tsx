'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AppState {
  isSurahSidebarOpen: boolean;
  isMobileDrawerOpen: boolean;
  isSearchOpen: boolean;
  isSettingsOpen: boolean;
  activeSurahId: number;
}

interface AppContextType extends AppState {
  toggleSurahSidebar: () => void;
  toggleMobileDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  setActiveSurah: (id: number) => void;
  closeMobileDrawer: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children, initialSurahId = 1 }: { children: ReactNode; initialSurahId?: number }) {
  const [state, setState] = useState<AppState>({
    isSurahSidebarOpen: true,
    isMobileDrawerOpen: false,
    isSearchOpen: false,
    isSettingsOpen: false,
    activeSurahId: initialSurahId,
  });

  const toggleSurahSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isSurahSidebarOpen: !prev.isSurahSidebarOpen }));
  }, []);

  const toggleMobileDrawer = useCallback(() => {
    setState(prev => ({ ...prev, isMobileDrawerOpen: !prev.isMobileDrawerOpen }));
  }, []);

  const closeMobileDrawer = useCallback(() => {
    setState(prev => ({ ...prev, isMobileDrawerOpen: false }));
  }, []);

  const openSearch = useCallback(() => {
    setState(prev => ({ ...prev, isSearchOpen: true }));
  }, []);

  const closeSearch = useCallback(() => {
    setState(prev => ({ ...prev, isSearchOpen: false }));
  }, []);

  const openSettings = useCallback(() => {
    setState(prev => ({ ...prev, isSettingsOpen: true }));
  }, []);

  const closeSettings = useCallback(() => {
    setState(prev => ({ ...prev, isSettingsOpen: false }));
  }, []);

  const setActiveSurah = useCallback((id: number) => {
    setState(prev => ({ ...prev, activeSurahId: id, isMobileDrawerOpen: false }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleSurahSidebar,
        toggleMobileDrawer,
        closeMobileDrawer,
        openSearch,
        closeSearch,
        openSettings,
        closeSettings,
        setActiveSurah,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
