import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const DB_FILE = 'courses.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, DB_FILE);

app.use(express.json());

// --- DATABASE HELPERS ---
async function initDb() {
    try {
        await fs.access(dbPath);
    } catch {
        await fs.writeFile(dbPath, JSON.stringify([], null, 2));
        console.log('Created new database file: courses.json');
    }
}

async function readDb() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function writeDb(data) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

// --- AUTH MIDDLEWARE ---
app.use((req, res, next) => {
    if (req.headers['x-role'] === 'admin') {
        req.user = { id: 'admin-1', role: 'ADMIN' };
    }
    next();
});

function requireAdmin(req, res, next) {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

// --- ROUTES ---

app.post('/admin/courses', requireAdmin, async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) return res.status(400).json({ error: 'Title/Category required' });

        const courses = await readDb();
        const newCourse = {
            _id: generateId(),
            title,
            description: req.body.description || '',
            category,
            published: req.body.published || false,
            createdBy: req.user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        courses.push(newCourse);
        await writeDb(courses);
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// --- UPDATE COURSE (Admin Only) ---
app.put('/admin/courses/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const courses = await readDb();
        const index = courses.findIndex(c => c._id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Merge existing course with updates
        const updatedCourse = {
            ...courses[index],
            ...req.body,
            _id: id, // Prevent ID change
            updatedAt: new Date().toISOString() // Update timestamp
        };

        courses[index] = updatedCourse;
        await writeDb(courses);
        res.json(updatedCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DELETE COURSE (Admin Only) ---
app.delete('/admin/courses/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const courses = await readDb();
        
        const filteredCourses = courses.filter(c => c._id !== id);

        if (courses.length === filteredCourses.length) {
            return res.status(404).json({ error: 'Course not found' });
        }

        await writeDb(filteredCourses);
        res.status(204).send(); // 204 No Content
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/courses', async (req, res) => {
    try {
        let courses = await readDb();
        const { page = 1, pageSize = 20, title, category } = req.query;

        // CHECK: Is the requester an Admin?
        const isAdmin = req.headers['x-role'] === 'admin'; 

        // FILTER: If NOT admin, show only published. 
        // If Admin, show everything.
        if (!isAdmin) {
            courses = courses.filter(c => c.published === true);
        }

        if (title) courses = courses.filter(c => c.title.toLowerCase().includes(title.toLowerCase()));
        if (category) courses = courses.filter(c => c.category === category);

        // Sort & Paginate
        courses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        const limit = Math.min(parseInt(pageSize), 100);
        const startIndex = (parseInt(page) - 1) * limit;
        const paginated = courses.slice(startIndex, startIndex + limit);

        res.json({
            data: paginated,
            pagination: { page: parseInt(page), pageSize: limit, total: courses.length }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// START
await initDb();
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Data storage: ${dbPath}`);
});
