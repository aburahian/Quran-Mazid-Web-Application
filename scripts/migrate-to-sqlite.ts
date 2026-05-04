import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const DB_PATH = path.join(__dirname, '..', 'backend', 'quran.db');

async function migrate() {
  console.log('Starting migration to SQLite...');

  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }

  const db = new Database(DB_PATH);

  // Create tables
  db.exec(`
    CREATE TABLE surahs (
      id INTEGER PRIMARY KEY,
      name_arabic TEXT,
      name_english TEXT,
      name_meaning TEXT,
      revelation_type TEXT,
      total_ayahs INTEGER
    );

    CREATE TABLE ayahs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      surah_id INTEGER,
      ayah_number INTEGER,
      text_arabic TEXT,
      text_english TEXT,
      text_normalized TEXT,
      FOREIGN KEY(surah_id) REFERENCES surahs(id)
    );

    CREATE INDEX idx_ayahs_surah_id ON ayahs(surah_id);
    CREATE INDEX idx_ayahs_text_english ON ayahs(text_english);
    CREATE INDEX idx_ayahs_text_normalized ON ayahs(text_normalized);
  `);

  const surahsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'surahs.json'), 'utf-8'));
  const arabicData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'quran-arabic.json'), 'utf-8'));
  const translationData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'quran-translation.json'), 'utf-8'));

  const insertSurah = db.prepare(`
    INSERT INTO surahs (id, name_arabic, name_english, name_meaning, revelation_type, total_ayahs)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertAyah = db.prepare(`
    INSERT INTO ayahs (surah_id, ayah_number, text_arabic, text_english, text_normalized)
    VALUES (?, ?, ?, ?, ?)
  `);

  function normalizeArabic(text: string): string {
    return text.replace(/[\u064B-\u065F\u0670]/g, '');
  }

  const transaction = db.transaction(() => {
    for (const surah of surahsData) {
      insertSurah.run(
        surah.id,
        surah.nameArabic,
        surah.nameEnglish,
        surah.nameMeaning,
        surah.revelationType,
        surah.totalAyahs
      );

      const surahIdStr = String(surah.id);
      const arabicAyahs = arabicData[surahIdStr] || [];
      const englishAyahs = translationData[surahIdStr] || [];

      for (let i = 0; i < arabicAyahs.length; i++) {
        const ar = arabicAyahs[i];
        const en = englishAyahs[i];
        insertAyah.run(
          surah.id,
          ar.ayah,
          ar.text,
          en?.text || '',
          normalizeArabic(ar.text)
        );
      }
    }
  });

  transaction();
  console.log('Migration complete! Database created at backend/quran.db');
  db.close();
}

migrate().catch(console.error);
