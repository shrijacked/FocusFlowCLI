const mongoose = require('mongoose');

const BackupSchema = new mongoose.Schema({
    backupFile: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Backup', BackupSchema);
