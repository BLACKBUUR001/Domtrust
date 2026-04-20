import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { initDB } from './db.js';
import submissionsRouter from './routes/submissions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1);

const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173'
];
const PROD_ORIGINS = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const allowedOrigins = [...DEV_ORIGINS, ...PROD_ORIGINS];

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // curl / same-origin
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origine non autorisée (${origin})`));
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json({ limit: '32kb' }));

app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
}));

app.use('/api/submissions', submissionsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\nServeur DomTrust demarre sur http://localhost:${PORT}`);
    console.log(`POST http://localhost:${PORT}/api/submissions/contact`);
    console.log(`POST http://localhost:${PORT}/api/submissions/agency`);
    console.log(`GET  http://localhost:${PORT}/api/health\n`);
  });
}).catch(err => {
  console.error('Impossible de demarrer le serveur:', err.message);
  process.exit(1);
});
