import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Use a stable path for the database
const DB_PATH = path.join(process.cwd(), 'src', 'data', 'quran.db');

let db: any = null;

function getDb() {
  if (!db) {
    try {
      console.log(`Attempting to open database at: ${DB_PATH}`);
      if (!fs.existsSync(DB_PATH)) {
        console.error(`Database file NOT found at: ${DB_PATH}`);
        // List directory contents to help debug
        const dir = path.dirname(DB_PATH);
        if (fs.existsSync(dir)) {
          console.log(`Directory ${dir} contents:`, fs.readdirSync(dir));
        } else {
          console.error(`Directory ${dir} does NOT exist.`);
        }
      }
      db = new Database(DB_PATH, { readonly: true });
      console.log('Database opened successfully');
    } catch (error) {
      console.error('Failed to open database:', error);
      throw error;
    }
  }
  return db;
}

export interface SearchResult {
  surah_id: number;
  surah_name_english: string;
  ayah_number: number;
  text_arabic: string;
  text_english: string;
  match_type: 'arabic' | 'english';
}

export function searchAyahs(query: string, limit: number = 20): SearchResult[] {
  const normalizedQuery = query.toLowerCase();
  const normalizedArabicQuery = query.replace(/[\u064B-\u065F\u0670]/g, '');

  const database = getDb();
  const stmt = database.prepare(`
    SELECT 
      a.surah_id, 
      s.name_english as surah_name_english, 
      a.ayah_number, 
      a.text_arabic, 
      a.text_english,
      CASE 
        WHEN a.text_english LIKE ? THEN 'english'
        ELSE 'arabic'
      END as match_type
    FROM ayahs a
    JOIN surahs s ON a.surah_id = s.id
    WHERE a.text_english LIKE ? 
       OR a.text_normalized LIKE ?
       OR a.text_arabic LIKE ?
    LIMIT ?
  `);

  return stmt.all(
    `%${normalizedQuery}%`, 
    `%${normalizedQuery}%`, 
    `%${normalizedArabicQuery}%`, 
    `%${query}%`, 
    limit
  ) as SearchResult[];
}

export function getSurahs() {
  return getDb().prepare('SELECT * FROM surahs').all();
}

export function getSurah(id: number) {
  const database = getDb();
  const surah = database.prepare('SELECT * FROM surahs WHERE id = ?').get(id);
  const ayahs = database.prepare('SELECT * FROM ayahs WHERE surah_id = ?').all(id);
  return { surah, ayahs };
}
