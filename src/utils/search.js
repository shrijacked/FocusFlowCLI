const { readJsonFile } = require('./utils');
const TODO_FILE = 'todos.json';


const search = async (keyword) => {
    try {
        
        const todos = await readJsonFile(TODO_FILE);
        
        
        const results = todos.filter(todo => todo.task.includes(keyword));

        
        if (results.length === 0) {
            console.log('No tasks found.');
        } else {
            results.forEach((todo, index) => {
                console.log(`${index + 1}. ${todo.task} [${todo.done ? 'x' : ' '}] (Priority: ${todo.priority}) (Due: ${todo.dueDate || 'N/A'})`);
            });
        }
    } catch (error) {
        console.error('Error searching tasks:', error.message);
    }
};

module.exports = search;