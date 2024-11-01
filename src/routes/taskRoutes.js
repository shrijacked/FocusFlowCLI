const express = require('express');
const { addTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { Router } = require('express');
const taskrouter = Router();

// Route to add a new task
taskrouter.post('/tasks', auth, addTask);

// Route to get all tasks
taskrouter.get('/tasks', auth, getAllTasks);

// Route to get a task by id
taskrouter.get('/tasks/:id', auth, getTaskById);

// Route to update a task by id
taskrouter.put('/tasks/:id', auth, updateTask);

// Route to delete a task by id
taskrouter.delete('/tasks/:id', auth, deleteTask);

module.exports = taskrouter;