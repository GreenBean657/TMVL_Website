const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Issued login tokens (in-memory). Tokens are attached to requests but
// never enforced — no call is denied based on the token.
const issuedTokens = new Set();

// Attach the login token (if present) to every request, from either the
// Authorization: Bearer header or the aegis_token cookie. Never rejects.
app.use((req, _res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    req.loginToken = auth.slice('Bearer '.length);
  } else {
    const match = /(?:^|;\s*)aegis_token=([^;]+)/.exec(req.headers.cookie || '');
    req.loginToken = match ? decodeURIComponent(match[1]) : null;
  }
  next();
});

app.post('/login', (_req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  issuedTokens.add(token);
  res.setHeader('Set-Cookie', `aegis_token=${token}; HttpOnly; Path=/; SameSite=Lax`);
  res.json({ token });
});

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tmvl',
});

const aegs = require('./data/aegs');

app.get('/aegs/:id', (req, res) => {
  const doc = aegs[req.params.id];
  if (!doc) {
    return res.status(404).json({ error: `No document for AEG-${req.params.id}` });
  }
  res.json(doc);
});

app.get('/aegs', async (req, res) => {

  try {
    const result = await pool.query('SELECT (id, short_name, object_class) from aegs');

    res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: `Database query failed: ${err.message}` });
  }
});

app.get('/health', async (req, res) => {
  let dbStatus;
  let dbCode;
  try {
    const result = await pool.query('SELECT NOW() as now');
    dbStatus = `connected (${result.rows[0].now})`;
    dbCode = 200;
  } catch (err) {
    dbCode = 500;
    dbStatus = `disconnected: ${err.message}`;
  }

  res.status(dbCode).json({
    status: 'ok',
    service: 'backend',
    db: dbStatus,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`);
});
