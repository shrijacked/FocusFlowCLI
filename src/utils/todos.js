const Task = require('../models/Task');
const History = require('../models/History');

// add a new to-do item
const addTask = async (taskDescription, options) => {
    try {
        const newTask = new Task({
            description: taskDescription,
            priority: options.priority || 1,
            dueDate: options.dueDate || null,
            category: options.category || 'General',
            recurring: options.recurring || false,
            status: 'undone',
            userId: options.userId,
        });
        await newTask.save();
        console.log('Task added successfully:', newTask);
    } catch (err) {
        console.error('Error adding task:', err);
    }
};

// list all to-do items
const listTasks = async (userId) => {
    try {
        const tasks = await Task.find({ userId });
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description} [${task.status}]`);
        });
    } catch (err) {
        console.error('Error listing tasks:', err);
    }
};

// remove a to-do item by index
const removeTask = async (index, userId) => {
    try {
        const tasks = await Task.find({ userId });
        if (index < 1 || index > tasks.length) {
            console.error('Invalid task index');
            return;
        }
        const taskToRemove = tasks[index - 1];
        await Task.deleteOne({ _id: taskToRemove._id });
        console.log('Task removed successfully:', taskToRemove);
    } catch (err) {
        console.error('Error removing task:', err);
    }
};

// mark a to-do item as done
const markTaskAsDone = async (index, userId) => {
    try {
        const tasks = await Task.find({ userId });
        if (index < 1 || index > tasks.length) {
            console.error('Invalid task index');
            return;
        }
        const taskToMark = tasks[index - 1];
        taskToMark.status = 'done';
        await taskToMark.save();
        console.log('Task marked as done:', taskToMark);
    } catch (err) {
        console.error('Error marking task as done:', err);
    }
};

// mark a to-do item as not done
const markTaskAsUndone = async (index, userId) => {
    try {
        const tasks = await Task.find({ userId });
        if (index < 1 || index > tasks.length) {
            console.error('Invalid task index');
            return;
        }
        const taskToMark = tasks[index - 1];
        taskToMark.status = 'undone';
        await taskToMark.save();
        console.log('Task marked as not done:', taskToMark);
    } catch (err) {
        console.error('Error marking task as not done:', err);
    }
};

// edit an existing task
const editTask = async (index, options, userId) => {
    try {
        const tasks = await Task.find({ userId });
        if (index < 1 || index > tasks.length) {
            console.error('Invalid task index');
            return;
        }
        const taskToEdit = tasks[index - 1];
        if (options.description) taskToEdit.description = options.description;
        if (options.priority) taskToEdit.priority = options.priority;
        if (options.dueDate) taskToEdit.dueDate = options.dueDate;
        if (options.category) taskToEdit.category = options.category;
        if (options.recurring !== undefined) taskToEdit.recurring = options.recurring;
        await taskToEdit.save();
        console.log('Task edited successfully:', taskToEdit);
    } catch (err) {
        console.error('Error editing task:', err);
    }
};

module.exports = {
    add: addTask,
    list: listTasks,
    remove: removeTask,
    done: markTaskAsDone,
    undone: markTaskAsUndone,
    edit: editTask
};