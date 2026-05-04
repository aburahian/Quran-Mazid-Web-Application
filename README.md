# Quran Mazid Web Application

A production-quality, responsive Quran web application built with Next.js 15+, TypeScript, and Tailwind CSS v4. Managed with high-performance Static Site Generation (SSG) for all 114 surahs.

## Features

- **Full Quran Reading**: High-fidelity Uthmanic font rendering (KFGQPC).
- **Search Engine**: Bilingual search functionality for both Arabic and English translation text.
- **Global Audio Player**: Persistent playback controls for per-ayah and sequential surah recitation.
- **Dynamic Themes**: Dark and light modes matching the premium QuranMazid experience.
- **Personalization**: Customizable Arabic fonts, text sizes, and translation preferences.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 (CSS-first)
- **State Management**: React Context (Global Theme, Global Audio)
- **Data Layer**: Locally bundled JSON for SSG + SQLite (Hono) for high-performance search.
- **Backend**: Node.js / Hono for dynamic search and metadata.

## Development

```bash
# Install dependencies
npm install

# Run development server (Frontend)
npm run dev

# Run backend server (Hono)
cd backend
npm install
npx tsx index.ts
```

## Data Migration

If you update the source JSON data, run the migration to sync the SQLite database:

```bash
npx tsx scripts/migrate-to-sqlite.ts
```

## Production

```bash
# Build for production
npm run build

# Start production server
npm start
```
