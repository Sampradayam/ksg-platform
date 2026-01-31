import database from './config/database.js';

const { db } = database;

(async () => {
  try {
    const result = await db.one('SELECT NOW()');
    console.log('DB connected at:', result.now);
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
})();
