require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();

// Middleware
app.use(express.json());

// Database connection
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Error: MONGODB_URI is not defined in the .env file.');
  process.exit(1); // Exit the application if the URI is not defined
}

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connection successful');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if unable to connect to the database
  }
}

// Connect to the database
connectToDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

// Start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
