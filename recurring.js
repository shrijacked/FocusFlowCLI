const { readJsonFile, writeJsonFile } = require('./utlis');
const TODO_FILE = 'todos.json';

const handleRecurringTasks = async () => {
    const todos = await readJsonFile(TODO_FILE);
    const now = new Date();
    todos.forEach(todo => {
        if (todo.recurring && todo.done) {
            const lastCompletedDate = new Date(todo.completedDate || todo.created);
            const oneWeek = 7 * 24 * 60 * 60 * 1000;
            if (now - lastCompletedDate > oneWeek) {
                todo.done = false;
                todo.completedDate = null; // Reset completion date
                todos.push({ ...todo, created: now.toISOString() }); // Re-add the recurring task
            }
        }
    });
    await writeJsonFile(TODO_FILE, todos);
};

module.exports = { handleRecurringTasks };
