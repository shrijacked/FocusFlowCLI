const fs = require("fs").promises;
const { Command } = require('commander');
const program = new Command();

const TODO_FILE = 'todos.json';

// Helper function to read todos from file
const readTodos = async () => {
    try {
        await fs.access(TODO_FILE);
        const data = await fs.readFile(TODO_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        } else {
            throw err;
        }
    }
};

// Helper function to write todos to file
const writeTodos = async (todos) => {
    await fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
};

// Helper function to list todos sorted by priority
const listTodosByPriority = async () => {
    const todos = await readTodos();
    if (todos.length === 0) {
        console.log('No to-do items found.');
    } else {
        todos.sort((a, b) => b.priority - a.priority); // Sort in descending order
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo.task} [${todo.done ? 'x' : ' '}] (Priority: ${todo.priority})`);
        });
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
    .action(async (task, options) => {
        const todos = await readTodos();
        const priority = parseInt(options.priority, 10);
        todos.push({ task, done: false, priority });
        await writeTodos(todos);
        console.log(`Added task: ${task} with priority: ${priority}`);
    });

program
    .command('list')
    .description('List all to-do items')
    .action(listTodosByPriority);

program
    .command('remove')
    .description('Remove a to-do item by index')
    .argument('<index>', 'Index of the task to remove')
    .action(async (index) => {
        const todos = await readTodos();
        const idx = parseInt(index, 10) - 1;
        if (idx >= 0 && idx < todos.length) {
            const removed = todos.splice(idx, 1);
            await writeTodos(todos);
            console.log(`Removed task: ${removed[0].task}`);
        } else {
            console.log('Invalid index.');
        }
    });

program
    .command('done')
    .description('Mark a to-do item as done')
    .argument('<index>', 'Index of the task to mark as done')
    .action(async (index) => {
        const todos = await readTodos();
        const idx = parseInt(index, 10) - 1;
        if (idx >= 0 && idx < todos.length) {
            todos[idx].done = true;
            await writeTodos(todos);
            console.log(`Marked task as done: ${todos[idx].task}`);
        } else {
            console.log('Invalid index.');
        }
    });

program
    .command('undone')
    .description('Mark a to-do item as not done')
    .argument('<index>', 'Index of the task to mark as not done')
    .action(async (index) => {
        const todos = await readTodos();
        const idx = parseInt(index, 10) - 1;
        if (idx >= 0 && idx < todos.length) {
            todos[idx].done = false;
            await writeTodos(todos);
            console.log(`Marked task as not done: ${todos[idx].task}`);
        } else {
            console.log('Invalid index.');
        }
    });

program.parse();