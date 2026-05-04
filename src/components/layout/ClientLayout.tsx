'use client';

import { AppProvider } from '@/store/AppContext';
import IconSidebar from '@/components/layout/IconSidebar';
import SurahSidebar from '@/components/layout/SurahSidebar';
import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import MobileDrawer from '@/components/layout/MobileDrawer';
import SearchModal from '@/components/search/SearchModal';
import SettingsPanel from '@/components/settings/SettingsPanel';

import { AudioProvider } from '@/store/AudioContext';

import PlayerBar from '@/components/layout/PlayerBar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AudioProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Fixed Left Icon Sidebar — Desktop only */}
          <IconSidebar />

          {/* Main wrapper */}
          <div
            className="flex flex-1 flex-col md:ml-[var(--sidebar-width)]"
            style={{ height: '100vh' }}
          >
            {/* Top Header */}
            <Header />

            {/* Content Area: Surah Sidebar + Main */}
            <div className="flex flex-1 overflow-hidden">
              {/* Surah Sidebar — Desktop only */}
              <SurahSidebar />

              {/* Main Content Scroll Area */}
              <main
                className="flex-1 overflow-y-auto"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                {children}
              </main>
            </div>
          </div>

          {/* Mobile Components */}
          <MobileDrawer />
          <MobileNav />

          {/* Overlays */}
          <SearchModal />
          <SettingsPanel />

          {/* Global Player Bar */}
          <PlayerBar />
        </div>
      </AudioProvider>
    </AppProvider>
  );
}
