import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { searchAyahs, getSurahs, getSurah } from '@/lib/serverDb';

// This is required for Next.js 15+ to handle the dynamic API routes
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

app.get('/surahs', (c) => {
  const surahs = getSurahs();
  return c.json(surahs);
});

app.get('/surahs/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  
  const data = getSurah(id);
  if (!data.surah) return c.json({ error: 'Surah not found' }, 404);
  
  return c.json(data);
});

app.get('/search', (c) => {
  const query = c.req.query('q');
  const limit = parseInt(c.req.query('limit') || '20', 10);
  
  if (!query || query.length < 2) {
    return c.json({ results: [] });
  }
  
  const results = searchAyahs(query, limit);
  return c.json({ results });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
