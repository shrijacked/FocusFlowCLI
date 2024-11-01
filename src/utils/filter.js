const { readJsonFile } = require('./utils');
const { colorizePriority } = require('./color');
const TODO_FILE = 'todos.json';

// function to filter tasks based on options
const filter = async (options) => {
    try {
        // read the todos from the todos.json file
        const todos = await readJsonFile(TODO_FILE);

        // filter the todos based on the options
        const filteredTodos = todos.filter(todo => {
            if (options.done && !todo.done) return false;
            if (options.undone && todo.done) return false;
            return true;
        });

        // display the filtered todos
        if (filteredTodos.length === 0) {
            console.log('No tasks found.');
        } else {
            filteredTodos.forEach((todo, index) => {
                const color = colorizePriority(todo.priority);
                console.log(`${color}${index + 1}. ${todo.task} [${todo.done ? 'x' : ' '}] (Priority: ${todo.priority}) (Due: ${todo.dueDate || 'N/A'})\x1b[0m`);
            });
        }
    } catch (error) {
        console.error('Error filtering tasks:', error.message);
    }
};

module.exports = filter;