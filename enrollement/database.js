const Database = require('better-sqlite3');
const db = new Database('enrollments.db');

// Enable WAL for better concurrency
db.pragma('journal_mode = WAL');

const setup = () => {
    console.log('Setting up database...');
    
    // Create the enrollments table
    // user_id and batch_id are TEXT for flexibility
    // status is strictly constrained
    // UNIQUE(user_id, batch_id) prevents duplicates at the database level
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            batch_id TEXT NOT NULL,
            status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, batch_id)
        )
    `;
    
    db.exec(createTableQuery);
    console.log('Database setup complete.');
};

setup();

module.exports = db;
