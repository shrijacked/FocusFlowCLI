const mongoose = require('mongoose');

// define the schema for tasks
const TaskSchema = new mongoose.Schema({
    description: { type: String, required: true }, // description of the task
    priority: { type: Number, default: 1 }, // priority of the task (default is 1)
    dueDate: { type: Date }, // due date of the task
    category: { type: String }, // category of the task
    recurring: { type: Boolean, default: false }, // whether the task is recurring (default is false)
    status: { type: String, default: 'undone', enum: ['undone', 'done'] }, // status of the task (default is 'undone')
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference to the user who created the task
}, { timestamps: true }); // add timestamps to track creation and update times

// create and export the Task model
module.exports = mongoose.model('Task', TaskSchema);