'use client';

import { useApp } from '@/store/AppContext';
import { useSettings } from '@/hooks/useSettings';
import { ARABIC_FONTS } from '@/lib/constants';

export default function SettingsPanel() {
  const { isSettingsOpen, closeSettings } = useApp();
  const { settings, setArabicFont, setArabicSize, setTranslationSize } = useSettings();

  if (!isSettingsOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
        onClick={closeSettings}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col animate-slide-right"
        style={{
          width: '320px',
          maxWidth: '90vw',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-color)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)' }}>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <h2 className="text-lg font-semibold text-white">Settings</h2>
          </div>
          <button
            onClick={closeSettings}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: 'var(--border-color)' }}>
          {['Translation', 'Reading'].map((tab, i) => (
            <button
              key={tab}
              className="flex-1 py-3 text-sm font-medium"
              style={{
                color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: i === 0 ? 'var(--bg-surface)' : 'transparent',
                borderBottom: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
          {/* Font Settings Section */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                T
              </div>
              <h3 className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                Font Settings
              </h3>
            </div>

            {/* Arabic Font Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white">Arabic Font Size</label>
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  {settings.arabicSize}
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="50"
                value={settings.arabicSize}
                onChange={e => setArabicSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Translation Font Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white">Translation Font Size</label>
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  {settings.translationSize}
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="28"
                value={settings.translationSize}
                onChange={e => setTranslationSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Arabic Font Face */}
            <div>
              <label className="text-sm font-medium text-white block mb-3">Arabic Font Face</label>
              <div className="space-y-2">
                {ARABIC_FONTS.map(font => (
                  <button
                    key={font.id}
                    onClick={() => setArabicFont(font.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: settings.arabicFont === font.id ? 'var(--accent-light)' : 'var(--bg-surface)',
                      border: `1px solid ${settings.arabicFont === font.id ? 'var(--accent)' : 'var(--border-color)'}`,
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: settings.arabicFont === font.id ? 'var(--accent)' : 'var(--text-primary)',
                      }}
                    >
                      {font.name}
                    </span>
                    {settings.arabicFont === font.id && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Preview</p>
            <p
              className={`arabic-text ${ARABIC_FONTS.find(f => f.id === settings.arabicFont)?.className} mb-2`}
              style={{ fontSize: `${settings.arabicSize}px`, direction: 'rtl', textAlign: 'right' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p style={{ fontSize: `${settings.translationSize}px`, color: 'var(--text-secondary)' }}>
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>

          {/* Info Banner */}
          <div
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            <p className="text-sm font-medium">Help spread the knowledge of Islam</p>
          </div>
        </div>
      </div>
    </>
  );
}
