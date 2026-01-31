// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// Slot Booking & Management
const slotRoutes = require('./routes/index'); // routes folder lo index.js lo slotbooking & management routes integrate cheyyali

app.use('/api/slots', slotRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/slot")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));



// Default route (optional)
app.get('/', (req, res) => {
  res.send('Slot Booking & Management Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
