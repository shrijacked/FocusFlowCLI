const { readJsonFile, writeJsonFile } = require('./utils'); // ensure the correct path to utils
const TODO_FILE = 'todos.json';

// function to handle recurring tasks
const handleRecurringTasks = async () => {
    try {
        // read the todos from the todos.json file
        const todos = await readJsonFile(TODO_FILE);
        const now = new Date();
        const newTodos = [];

        // iterate over the todos to handle recurring tasks
        todos.forEach(todo => {
            if (todo.recurring && todo.done) {
                const lastCompletedDate = new Date(todo.completedDate || todo.created);
                const oneWeek = 7 * 24 * 60 * 60 * 1000;
                if (now - lastCompletedDate > oneWeek) {
                    todo.done = false;
                    todo.completedDate = null; // reset completion date
                    newTodos.push({ ...todo, created: now.toISOString() }); // re-add the recurring task
                }
            }
        });

        // append the new recurring tasks to the todos array
        const updatedTodos = [...todos, ...newTodos];

        // write the updated todos to the todos.json file
        await writeJsonFile(TODO_FILE, updatedTodos);

        console.log('Recurring tasks handled successfully.');
    } catch (error) {
        console.error('Error handling recurring tasks:', error.message);
    }
};

module.exports = { handleRecurringTasks };