// (R) - Required dependencies
const express = require('express');
const morgan = require('morgan');
const menuRoutes = require('./src/routes/menu.routes');

// (A) - App initialization
const app = express();
const port = process.env.PORT || 3000;

// (M) - Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Standard practice to group static serving with middlewares

// (E) - Endpoints / Routes
app.get('/', (req, res) => {
  res.json('Hello! the server is working!');
});

app.use('/api/menu', menuRoutes);

// (S) - Server initialization
app.listen(port, () => {
  const now = new Date().toLocaleString();
  console.log(`[${now}]: Server is running on port ${port} ☕`);
});