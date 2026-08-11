const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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
