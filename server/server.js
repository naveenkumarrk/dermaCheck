const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageUploadRoutes'); // Use the combined routes file
dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://derma-check-omhp.vercel.app', 'https://derma-check.vercel.app'], // Your Vite client URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Serve uploaded files
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', imageRoutes); // Mount all image-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app