#!/usr/bin/env node
require('dotenv').config();
const { Command } = require('commander');
const program = new Command();
const todo = require('./src/utils/todos');
const connectDB = require('./src/config/db');
const jwt = require('jsonwebtoken');

// Connect to database
connectDB();

// Function to authenticate user and get user ID from token
const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.user.id;
    } catch (err) {
        console.error('Invalid or missing token');
        process.exit(1);
    }
};

program
    .name('todo')
    .description('CLI to manage to-do tasks')
    .version('1.0.0');

program
    .command('add')
    .description('Add a new to-do item')
    .argument('<task>', 'Task to add')
    .option('-p, --priority <priority>', 'Priority of the task', '1')
    .option('-d, --due <dueDate>', 'Due date for the task')
    .option('-c, --category <category>', 'Category for the task')
    .option('-r, --recurring', 'Set task as recurring')
    .option('-t, --token <token>', 'JWT token for authentication')
    .action((task, options) => {
        const userId = getUserIdFromToken(options.token);
        todo.add(task, { ...options, userId });
    });

program
    .command('list')
    .description('List all to-do items')
    .option('-t, --token <token>', 'JWT token for authentication')
    .action((options) => {
        const userId = getUserIdFromToken(options.token);
        todo.list(userId);
    });

program
    .command('remove <index>')
    .description('Remove a to-do item by index')
    .option('-t, --token <token>', 'JWT token for authentication')
    .action((index, options) => {
        const userId = getUserIdFromToken(options.token);
        todo.remove(index, userId);
    });

program
    .command('done <index>')
    .description('Mark a to-do item as done')
    .option('-t, --token <token>', 'JWT token for authentication')
    .action((index, options) => {
        const userId = getUserIdFromToken(options.token);
        todo.done(index, userId);
    });

program
    .command('undone <index>')
    .description('Mark a to-do item as not done')
    .option('-t, --token <token>', 'JWT token for authentication')
    .action((index, options) => {
        const userId = getUserIdFromToken(options.token);
        todo.undone(index, userId);
    });

program
    .command('edit <index>')
    .description('Edit an existing task')
    .option('-d, --description <description>', 'New description for the task')
    .option('-p, --priority <priority>', 'New priority for the task')
    .option('-D, --due <dueDate>', 'New due date for the task')
    .option('-c, --category <category>', 'New category for the task')
    .option('-r, --recurring', 'Set task as recurring')
    .option('-t, --token <token>', 'JWT token for authentication')
    .action((index, options) => {
        const userId = getUserIdFromToken(options.token);
        todo.edit(index, options, userId);
    });

program.parse(process.argv);