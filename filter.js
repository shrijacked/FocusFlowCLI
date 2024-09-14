const { readJsonFile } = require('./utlis');
const TODO_FILE = 'todos.json';

const filter = async (options) => {
    const todos = await readJsonFile(TODO_FILE);
    const filteredTodos = todos.filter(todo => {
        if (options.done && !todo.done) return false;
        if (options.undone && todo.done) return false;
        return true;
    });
    if (filteredTodos.length === 0) {
        console.log('No tasks found.');
    } else {
        filteredTodos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo.task} [${todo.done ? 'x' : ' '}] (Priority: ${todo.priority}) (Due: ${todo.dueDate || 'N/A'})`);
        });
    }
};

module.exports = filter;
