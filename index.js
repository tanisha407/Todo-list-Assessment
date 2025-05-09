

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/todos', todoRoutes);

// Serve frontend files (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
