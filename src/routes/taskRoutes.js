const express = require('express');
const { addTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const taskrouter = express.Router();


// Route to add a new task
taskrouter.post('/', auth, addTask);

// Route to get all tasks
taskrouter.get('/', auth, getAllTasks);

// Route to get a task by id
taskrouter.get('/:id', auth, getTaskById);

// Route to update a task by id
taskrouter.put('/:id', auth, updateTask);

// Route to delete a task by id
taskrouter.delete('/:id', auth, deleteTask);

module.exports = taskrouter;