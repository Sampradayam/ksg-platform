const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());

// POST /api/enrollments
// Creates a new enrollment request
app.post('/api/enrollments', (req, res) => {
    const { user_id, batch_id } = req.body;

    // 1. Validation
    if (!user_id || !batch_id) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'user_id and batch_id are required'
        });
    }

    try {
        // 2. Insert into DB
        // Status defaults to 'pending' via schema definition
        const stmt = db.prepare('INSERT INTO enrollments (user_id, batch_id) VALUES (?, ?)');
        const info = stmt.run(user_id, batch_id);

        // 3. Success Response
        res.status(201).json({
            id: info.lastInsertRowid,
            user_id,
            batch_id,
            status: 'pending', // We know this is the default
            message: 'Enrollment request created successfully'
        });

    } catch (err) {
        // 4. Error Handling
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({
                error: 'Conflict',
                message: 'Enrollment request already exists for this user and batch'
            });
        }

        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/enrollments/:id
// Helper to view status
app.get('/api/enrollments/:id', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM enrollments WHERE id = ?');
        const enrollment = stmt.get(req.params.id);

        if (!enrollment) {
            return res.status(404).json({ error: 'Not Found' });
        }

        res.json(enrollment);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
