const express = require('express');
const connectToDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectToDb();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes for user-related operations
app.use('/api/users', userRoutes);

// Routes for task-related operations
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));