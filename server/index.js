import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db.js';
import submissionsRouter from './routes/submissions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/submissions', submissionsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialiser la DB puis démarrer le serveur
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Serveur DomTrust démarré sur http://localhost:${PORT}`);
    console.log(`📋 API Contact:  POST http://localhost:${PORT}/api/submissions/contact`);
    console.log(`📋 API Agence:   POST http://localhost:${PORT}/api/submissions/agency`);
    console.log(`💚 Health check: GET  http://localhost:${PORT}/api/health\n`);
  });
}).catch(err => {
  console.error('❌ Impossible de démarrer le serveur:', err.message);
  process.exit(1);
});
