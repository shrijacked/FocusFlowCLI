const fs = require('fs').promises;
const path = require('path');

const TODO_FILE = 'todos.json';
const HISTORY_FILE = 'history.json';
const BACKUP_DIR = 'backups';

// Helper function to read JSON file
const readJsonFile = async (file) => {
    try {
        await fs.access(file);
        const data = await fs.readFile(file, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        } else {
            throw err;
        }
    }
};

// Helper function to write JSON file
const writeJsonFile = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
};

// Save task completion to history
const saveToHistory = async (task, status) => {
    const history = await readJsonFile(HISTORY_FILE);
    history.push({ task, status, date: new Date().toISOString() });
    await writeJsonFile(HISTORY_FILE, history);
};

module.exports = { readJsonFile, writeJsonFile, saveToHistory };
