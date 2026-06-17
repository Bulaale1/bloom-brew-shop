// (R) - Required dependencies
const express = require('express');
const morgan = require('morgan');
const menuRoutes = require('./src/routes/menu.routes');
const ordersRoutes = require('./src/routes/orders.routes');
const cors = require('cors');
const errorHandler = require('./src/middlewares/error.middleware');



// (A) - App initialization
const app = express();
const port = process.env.PORT || 3000;

// (M) - Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 // Standard practice to group static serving with middlewares
app.use(express.static('public'));
app.use(cors());
// (E) - Endpoints / Routes
app.get('/', (req, res) => {
  res.json('Hello! the server is working!');
});
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);
app.use(errorHandler);

// (S) - Server initialization
app.listen(port, () => {
  const now = new Date().toLocaleString();
  console.log(`[${now}]: Server is running on port ${port} ☕`);
});