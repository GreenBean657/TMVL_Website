const express = require('express');
const cors = require('cors');
const argon2 = require('argon2');
const mysql = require('mysql2/promise');
require('dotenv').config();

const { Worker } = require('worker_threads');

// TODO: rm -rf
const aegs = require('./data/aegs');
const assert = require("node:assert");



/*
 * Auth
 * Sessions
 */
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({
    // Reuse your existing pool or connection details
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tmvl',
    // Security: short-lived sessions, auto-cleanup
    expiration: 86400000,        // 24 hours
    checkExpirationInterval: 900000, // Clean expired every XX
    createDatabaseTable: true, // Auto-create sessions table
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized.' });
    }
    next(); // Proceed with req
}

assert(process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32, 'SESSION_SECRET must be set and at least 32 characters long');
app.use(session({
    store: sessionStore,
    name: '__Host-sessionId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,   //HTTPS State
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 86400000  // 24 hours
    }
}));




// Includes
const limits = require('./modules/limits');
const {resolveAllowedIps} = require("./modules/iprestrictor");

const lazyRegistrationWorker = new Worker('./workers/lazyregistration.js', {
    workerData: {
        dbHost: process.env.DB_HOST || 'localhost',
        dbPort: Number(process.env.DB_PORT || 3306),
        dbUser: process.env.DB_USER || 'root',
        dbName: process.env.DB_NAME || 'tmvl',
        dbPassword: process.env.DB_PASSWORD || '',
    }
});
async function hashPassword(password) {
    if (typeof password !== 'string' || password.length === 0) {
        throw new Error('Password must be a non-empty string');
    }
  try {
    return await argon2.hash(password, {
      // DO NOT CHANGE
      // WILL DESTROY ALL EXISTING PASSWORDS IF CHANGED
      // MODIFY IN CONJUNCTION WITH MIGRATION
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 5,
      parallelism: 4
    })
  } catch (err) {
    console.error('Error hashing password:', err);
    throw new Error(`Password hashing failed: ${err.message}`);
  }
}
async function verifyPassword(hash, password) {
    try {
        return await argon2.verify(hash, password);
    } catch (err) {
        console.error('Error verifying password:', err);
       return false;
    }
}

const app = express();
const PORT = process.env.PORT || 25672;
const WEBSITE_URL = process.env.WEBSITE_URL || `http://localhost:${PORT}`;

app.set('trust proxy', 1); // TLS Verification Hop for pengucc.com
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tmvl',
  waitForConnections: true,
  connectionLimit: 10,
});

/**
 * Registration endpoint, executed in-game.
 * IP Restricted to prevent non-IG users from registering.
 */
app.use('/auth/register/', limits.registerLimiter);
app.post('/auth/register/', async (req, res) => {
    if (!resolveAllowedIps(req.ip)) {
        return res.status(403).json({ error: 'Access denied.' });
    }

    /*
     * Lazy Registration Worker
     * Clears expired registration entries in the database asynchronously to avoid blocking the main thread.
     */
    lazyRegistrationWorker.on('message', (result) => console.log(result));
    lazyRegistrationWorker.postMessage({
        sql: 'DELETE FROM registration_junction WHERE expires_at < NOW();',
        params: []
    });

    const { username, uuid } = req.body;
    //Validate Input
    if (!(username && uuid)) {
      return res.status(400).json({ error: 'Username and UUID are required.' });
    }
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'Username must be between 3 and 20 characters.' });
    }
    if (uuid.length !== 36) {
      return res.status(400).json({ error: 'UUID must be 36 characters long.' });
    }
    //Validate OCC Main DB
    try {
      const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
      if (existing.length > 0) {
        return res.status(409).json({ error: 'Username already exists.' });
      }
    } catch (err) {
      return res.status(500).json({ error: `Database query failed: ${err.message}` });
    }
    //Validate OCC Registration System
    try {
      const [existing] = await pool.query('SELECT url_uuid FROM registration_junction WHERE player_uuid = ?', [uuid]);
      if (existing.length > 0) {
        return res.status(200).send(WEBSITE_URL + 'register/' + existing[0].url_uuid);
      }
    } catch (err) {
      return res.status(500).json({ error: `Database query failed: ${err.message}` });
    }
    //Create and send.
    let randomUUID = crypto.randomUUID()
    try {
      const [] = await pool.query('INSERT INTO registration_junction (player_username, player_uuid, url_uuid, expires_at) VALUES (?, ?, ?, ?)', [username, uuid, randomUUID, new Date(Date.now() + 24 * 60 * 60 * 1000)]);
    } catch (err) {
        return res.status(500).json({ error: `Database query failed: ${err.message}` });
    }

    return res.status(200).send(WEBSITE_URL + 'register/' + randomUUID);
})

app.post('/auth/fetch_registration_uuid', async (req, res) => {
  const { uuid } = req.body;
  try {
    const [rows] = await pool.query('SELECT player_username FROM registration_junction WHERE url_uuid = ?', [uuid]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Registration UUID not found.' });
    }
    return res.status(200).json({ player_username: rows[0].player_username });
  } catch (err) {
    return res.status(500).json({ error: `Database query failed: ${err.message}` });
  }
});

app.use('/auth/finalize_registration', limits.registerLimiter);
app.post('/auth/finalize_registration', async (req, res) => {
    const { uuid, password } = req.body;
    if (!uuid || !password) {
        return res.status(400).json({ error: 'UUID and password are required.' });
    }
    if (password.length < 8 || password.length > 128) {
        return res.status(400).json({ error: 'Password must be between 8 and 128 characters.' });
    }
    let result;
    try {
         const [rows] = await pool.query('SELECT * FROM registration_junction WHERE url_uuid = ? LIMIT 1', [uuid]);
         result = rows[0];
    } catch (err) {
        return res.status(500).json({ error: `Database query failed: ${err.message}` });
    }
    let rankid;
    try {
        try {
            const [rows] = await pool.query('SELECT id FROM ranks WHERE name = ?', ['Auxiliary Personnel']);
            if (rows.length === 0) {
                rankid = 0;
            }
            rankid = rows[0].id;
        } catch (err) {
            // RankID failure, assume 0 is lowest.
            rankid = 0;
        }
        const hashedPassword = await hashPassword(password);
        await pool.query('INSERT INTO users (username, player_uuid, password_hash, rank_id) VALUES (?, ?, ?, ?)', [result.player_username, result.player_uuid, hashedPassword, rankid]);
    } catch (err) {
        return res.status(500).json({ error: `Database query failed: ${err.message}` });
    }
    try {
        await pool.query('DELETE FROM registration_junction WHERE url_uuid = ?', [uuid]);
    } catch (err) {/* Pass, lazy cleanup will occur next registration. */}
    return res.status(200).json({ status: 'ok' });
});

app.use("/auth/login/", limits.loginLimiter);
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  let rows;
  try {
      [rows] = await pool.query('SELECT id, username, password_hash, rank_id FROM users WHERE username = ? LIMIT 1', [username]);
  } catch (err) {
      return res.status(500).json({ error: `Database query failed: ${err.message}` });
  }
  if (rows.length === 0) {
      await hashPassword("PREVENT_TIMING_WATCH");
      return res.status(403).json({ error: 'Invalid Credentials.'});
  }
  const user = rows[0]
  const valid = await verifyPassword(user.password_hash, password);
  if (!valid) {
      return res.status(403).json({ error: 'Invalid Credentials.'});
  }

  req.session.regenerate((err) => {
    if (err) {
      return res.status(500).json({ error: 'Session regeneration failed.' });
    }

    //Session context
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.rankId = user.rank_id;

    // Additional session headers
    req.session.ip = req.ip;
    req.session.ua = req.headers['user-agent'];

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session save failed.' });
      }
      res.status(200).json({ status: 'ok' });
    });
  })
})

app.post('/auth/logout', requireAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Logout did an explosion' });
        res.clearCookie('__Host-sessionId', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(200).json({ status: 'ok' });
    })
})

app.get('/aegs/:id', (req, res) => {
  const doc = aegs[req.params.id];
  if (!doc) {
    return res.status(404).json({ error: `No document for AEG-${req.params.id}` });
  }
  res.json(doc);
});

app.get('/aegs', async (req, res) => {

  try {
    const [rows] = await pool.query('SELECT id, short_name, object_class FROM aegs');

    res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: `Database query failed: ${err.message}` });
  }
});

app.get('/health', async (req, res) => {
  let dbStatus;
  let dbCode;
  try {
    const [rows] = await pool.query('SELECT NOW() as now');
    dbStatus = `connected (${rows[0].now})`;
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

app.get('/me', requireAuth, async (req, res) => {
    /*
     * ME:
     * req.session.userId
     * req.session.rankId
     */
    let rows;
    try {
        [rows] = await pool.query(
            'SELECT id, username, rank_id FROM users WHERE id = ? LIMIT 1',
            [req.session.userId]
        );
    } catch (err) {
        return res.status(500).json({ error: `Database query failed: ${err.message}` });
    }
    if (rows.length === 0) {
        req.session.destroy();
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json({
        id: rows[0].id,
        username: rows[0].username,
        rankId: rows[0].rank_id
    });
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`);
});