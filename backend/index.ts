import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { searchAyahs, getSurahs, getSurah } from './db';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

app.get('/', (c) => {
  return c.json({
    message: 'Quran Web App API',
    endpoints: ['/api/surahs', '/api/surahs/:id', '/api/search?q=query']
  });
});

app.get('/api/surahs', (c) => {
  const surahs = getSurahs();
  return c.json(surahs);
});

app.get('/api/surahs/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  
  const data = getSurah(id);
  if (!data.surah) return c.json({ error: 'Surah not found' }, 404);
  
  return c.json(data);
});

app.get('/api/search', (c) => {
  const query = c.req.query('q');
  const limit = parseInt(c.req.query('limit') || '20', 10);
  
  if (!query || query.length < 2) {
    return c.json({ results: [] });
  }
  
  const results = searchAyahs(query, limit);
  return c.json({ results });
});

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
