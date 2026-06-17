// Load environment variables before anything reads process.env.
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  const now = new Date().toLocaleString();
  console.log(`[${now}]: Server is running on port ${port} ☕`);
});

// Graceful shutdown: stop accepting connections, then exit.
const shutdown = (signal) => {
  console.log(`\n${signal} received — shutting down gracefully.`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Safety net for any promise rejection that wasn't handled locally.
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  server.close(() => process.exit(1));
});