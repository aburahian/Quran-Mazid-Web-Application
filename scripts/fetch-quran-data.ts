/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Fetch Quran data from public APIs and save as static JSON.
 * Run: npx ts-node --esm scripts/fetch-quran-data.ts
 * Or:  node scripts/fetch-quran-data.mjs
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

async function fetchWithRetry(url: string, retries = 3): Promise<unknown> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.log(`Retry ${i + 1}/${retries} for ${url}`);
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

async function main() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  console.log('Fetching Arabic text from risan/quran-json...');
  const arabicData = await fetchWithRetry(
    'https://raw.githubusercontent.com/risan/quran-json/main/data/quran.json'
  ) as Record<string, Array<{ chapter: number; verse: number; text: string }>>;

  // Transform to our format
  const arabicBysurah: Record<string, Array<{ ayah: number; text: string }>> = {};
  for (const [surahId, ayahs] of Object.entries(arabicData)) {
    arabicBysurah[surahId] = (ayahs as Array<{ chapter: number; verse: number; text: string }>).map(a => ({
      ayah: a.verse,
      text: a.text,
    }));
  }

  fs.writeFileSync(
    path.join(DATA_DIR, 'quran-arabic.json'),
    JSON.stringify(arabicBysurah),
    'utf-8'
  );
  console.log('✓ Arabic text saved');

  // Fetch English translations (Sahih International) surah by surah
  console.log('Fetching English translations from alquran.cloud...');
  const translationBysurah: Record<string, Array<{ ayah: number; text: string }>> = {};

  for (let surahId = 1; surahId <= 114; surahId++) {
    try {
      const data = await fetchWithRetry(
        `https://api.alquran.cloud/v1/surah/${surahId}/en.sahih`
      ) as { data: { ayahs: Array<{ numberInSurah: number; text: string }> } };

      translationBysurah[surahId] = data.data.ayahs.map(a => ({
        ayah: a.numberInSurah,
        text: a.text,
      }));

      if (surahId % 10 === 0) {
        console.log(`  Progress: ${surahId}/114 surahs`);
      }
      // Small delay to be nice to the API
      await new Promise(r => setTimeout(r, 100));
    } catch (e) {
      console.error(`Failed to fetch surah ${surahId}:`, e);
    }
  }

  fs.writeFileSync(
    path.join(DATA_DIR, 'quran-translation.json'),
    JSON.stringify(translationBysurah),
    'utf-8'
  );
  console.log('✓ English translations saved');

  // Build ayah number mapping (surahId -> starting absolute ayah number)
  const surahs = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'surahs.json'), 'utf-8')
  );
  const ayahMap: Record<number, number> = {};
  let runningTotal = 0;
  for (const surah of surahs) {
    ayahMap[surah.id] = runningTotal;
    runningTotal += surah.totalAyahs;
  }

  fs.writeFileSync(
    path.join(DATA_DIR, 'ayah-offset-map.json'),
    JSON.stringify(ayahMap),
    'utf-8'
  );
  console.log('✓ Ayah offset map saved');
  console.log(`Total ayahs: ${runningTotal}`);
  console.log('Done!');
}

main().catch(console.error);
