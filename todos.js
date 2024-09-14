const { readJsonFile, writeJsonFile, saveToHistory } = require('./utlis');
const { handleRecurringTasks } = require('./recurring');
const TODO_FILE = 'todos.json';

const add = async (task, options) => {
    const todos = await readJsonFile(TODO_FILE);
    const priority = parseInt(options.priority, 10);
    const dueDate = options.due || null;
    const category = options.category || null;
    const recurring = options.recurring || false;
    todos.push({ task, done: false, priority, dueDate, category, recurring, created: new Date().toISOString() });
    await writeJsonFile(TODO_FILE, todos);
    console.log(`Added task: ${task} with priority: ${priority}, due date: ${dueDate || 'N/A'}, category: ${category || 'N/A'}`);
};

const list = async () => {
    const todos = await readJsonFile(TODO_FILE);
    if (todos.length === 0) {
        console.log('No to-do items found.');
    } else {
        todos.sort((a, b) => b.priority - a.priority || new Date(a.dueDate) - new Date(b.dueDate));
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo.task} [${todo.done ? 'x' : ' '}] (Priority: ${todo.priority}) (Due: ${todo.dueDate || 'N/A'} | Category: ${todo.category || 'N/A'})`);
        });
    }
};

const remove = async (index) => {
    const todos = await readJsonFile(TODO_FILE);
    const idx = parseInt(index, 10) - 1;
    if (idx >= 0 && idx < todos.length) {
        const removed = todos.splice(idx, 1);
        await writeJsonFile(TODO_FILE, todos);
        console.log(`Removed task: ${removed[0].task}`);
    } else {
        console.log('Invalid index.');
    }
};

const done = async (index) => {
    const todos = await readJsonFile(TODO_FILE);
    const idx = parseInt(index, 10) - 1;
    if (idx >= 0 && idx < todos.length) {
        todos[idx].done = true;
        await writeJsonFile(TODO_FILE, todos);
        console.log(`Marked task as done: ${todos[idx].task}`);
        await handleRecurringTasks(); // Handle recurring tasks
        await saveToHistory(todos[idx].task, 'Done');
    } else {
        console.log('Invalid index.');
    }
};

const undone = async (index) => {
    const todos = await readJsonFile(TODO_FILE);
    const idx = parseInt(index, 10) - 1;
    if (idx >= 0 && idx < todos.length) {
        todos[idx].done = false;
        await writeJsonFile(TODO_FILE, todos);
        console.log(`Marked task as not done: ${todos[idx].task}`);
        await saveToHistory(todos[idx].task, 'Undone');
    } else {
        console.log('Invalid index.');
    }
};

const edit = async (index, options) => {
    const todos = await readJsonFile(TODO_FILE);
    const idx = parseInt(index, 10) - 1;
    if (idx >= 0 && idx < todos.length) {
        if (options.task) todos[idx].task = options.task;
        if (options.priority) todos[idx].priority = parseInt(options.priority, 10);
        if (options.due) todos[idx].dueDate = options.due;
        if (options.category) todos[idx].category = options.category;
        await writeJsonFile(TODO_FILE, todos);
        console.log(`Edited task: ${todos[idx].task}`);
        await saveToHistory(todos[idx].task, 'Edited');
    } else {
        console.log('Invalid index.');
    }
};

const group = async () => {
    const todos = await readJsonFile(TODO_FILE);
    const grouped = todos.reduce((acc, todo) => {
        if (todo.category) {
            if (!acc[todo.category]) acc[todo.category] = [];
            acc[todo.category].push(todo);
        }
        return acc;
    }, {});
    for (const [category, tasks] of Object.entries(grouped)) {
        console.log(`Category: ${category}`);
        tasks.forEach((todo, index) => {
            console.log(`  ${index + 1}. ${todo.task} [${todo.done ? 'x' : ' '}] (Priority: ${todo.priority}) (Due: ${todo.dueDate || 'N/A'})`);
        });
    }
};

const history = async () => {
    const history = await readJsonFile('history.json');
    if (history.length === 0) {
        console.log('No task history found.');
    } else {
        history.forEach((entry, index) => {
            console.log(`${index + 1}. Task: ${entry.task} | Status: ${entry.status} | Date: ${entry.date}`);
        });
    }
};

module.exports = { add, list, remove, done, undone, edit, group, history };
