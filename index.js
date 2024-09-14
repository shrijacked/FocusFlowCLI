#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const todo = require('./todos');
const search = require('./search');
const filter = require('./filter');
const backup = require('./backup');
const recurring = require('./recurring');
const color = require('./color');

program
    .name('todo')
    .description('CLI to manage to-do tasks')
    .version('1.0.0');

// Define commands using imported functions
program
    .command('add')
    .description('Add a new to-do item')
    .argument('<task>', 'Task to add')
    .option('-p, --priority <priority>', 'Priority of the task', '1')
    .option('-d, --due <dueDate>', 'Due date for the task')
    .option('-c, --category <category>', 'Category for the task')
    .option('-r, --recurring', 'Set task as recurring')
    .action(todo.add);

program
    .command('list')
    .description('List all to-do items')
    .action(todo.list);

program
    .command('remove')
    .description('Remove a to-do item by index')
    .argument('<index>', 'Index of the task to remove')
    .action(todo.remove);

program
    .command('done')
    .description('Mark a to-do item as done')
    .argument('<index>', 'Index of the task to mark as done')
    .action(todo.done);

program
    .command('undone')
    .description('Mark a to-do item as not done')
    .argument('<index>', 'Index of the task to mark as not done')
    .action(todo.undone);

program
    .command('filter')
    .description('Filter tasks by status (done or not done)')
    .option('-d, --done', 'Show only completed tasks')
    .option('-u, --undone', 'Show only uncompleted tasks')
    .action(filter);

program
    .command('edit')
    .description('Edit an existing task')
    .argument('<index>', 'Index of the task to edit')
    .option('-t, --task <task>', 'New task description')
    .option('-p, --priority <priority>', 'New priority for the task')
    .option('-d, --due <dueDate>', 'New due date for the task')
    .option('-c, --category <category>', 'New category for the task')
    .action(todo.edit);

program
    .command('search')
    .description('Search for tasks by keyword')
    .argument('<keyword>', 'Keyword to search for')
    .action(search);

program
    .command('group')
    .description('Group tasks by category')
    .action(todo.group);

program
    .command('backup')
    .description('Backup the to-do list to a file')
    .action(backup.backup);

program
    .command('restore')
    .description('Restore the to-do list from a backup file')
    .argument('<backupFile>', 'Path to the backup file')
    .action(backup.restore);

program
    .command('history')
    .description('View task history')
    .action(todo.history);

program.parse();
