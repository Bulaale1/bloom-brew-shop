// (R) - Required dependencies
const express = require('express');
const pool = require('./src/db/pool');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const menuRoutes = require('./src/routes/menu.routes');
const ordersRoutes = require('./src/routes/orders.routes');
const authRoutes = require('./src/routes/auth.routes');
const errorHandler = require('./src/middlewares/error.middleware');

// (A) - App initialization
const app = express();

// (M) - Middleware setup
// Security headers and CORS go first so every response is covered.
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Verbose logging in development, concise in production.
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing (with a sane size cap).
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Static assets.
app.use(express.static('public'));

// Basic rate limiting on the API. Enforced in production only so local
// development and frontend testing aren't throttled.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV !== 'production',
});
app.use('/api', apiLimiter);

// (E) - Endpoints / Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bloom & Brew API' });
});

// Structured health check — also verifies DB connectivity.
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', db: 'unreachable' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);

// JSON 404 for anything that matched no route (instead of Express's HTML default).
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized error handler — must be registered last.
app.use(errorHandler);

module.exports = app;