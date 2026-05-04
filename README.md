# Quran Mazid Web Application

A production-quality, responsive Quran web application built with Next.js 15+, TypeScript, and Tailwind CSS v4. Managed with high-performance Static Site Generation (SSG) for all 114 surahs.

## ✨ Key Features

### 📚 Quran Experience
- Complete Quran with all **114 Surahs**
- High-fidelity **Uthmanic script (KFGQPC font)**
- Clean, distraction-free reading UI

### 🔍 Smart Search
- Bilingual search (**Arabic + English**)
- Fast and efficient query handling via SQLite
- Real-time filtering experience

### 🔊 Global Audio Player
- Persistent audio player across pages
- Per-ayah playback
- Sequential Surah recitation
- Play / Pause / Resume controls

### 🎨 Personalization
- Dark / Light mode (system-aware)
- Adjustable Arabic font styles
- Customizable text sizes
- Translation preferences

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes

---

## 🧠 Architecture & Engineering

This project is built with **production-level architecture**:

- ⚡ Static Site Generation (SSG) for all Surahs
- 🧩 Modular component structure
- 🔒 Strict TypeScript (no unnecessary `any`)
- ♻️ Reusable hooks and services
- 🎯 Separation of concerns (UI / Logic / Data)

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
