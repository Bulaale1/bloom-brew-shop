// Load environment variables before anything reads process.env.
require('dotenv').config();

const app = require('./app');
const migrate = require('./src/db/migrate');

const port = process.env.PORT || 3000;

migrate()
  .then(() => {
    const server = app.listen(port, () => {
      const now = new Date().toLocaleString();
      console.log(`[${now}]: Server is running on port ${port} ☕`);
    });

    const shutdown = (signal) => {
      console.log(`\n${signal} received — shutting down gracefully.`);
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT',  () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled rejection:', reason);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    console.error('Database migration failed:', err);
    process.exit(1);
  });
