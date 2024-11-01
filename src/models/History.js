const mongoose = require('mongoose');


const HistorySchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }, 
    status: { type: String, required: true, enum: ['created', 'updated', 'deleted'] },
    date: { type: Date, default: Date.now }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});


module.exports = mongoose.model('History', HistorySchema);