const fs = require('fs').promises;
const path = require('path');
const { readJsonFile, writeJsonFile } = require('./utils'); 
const TODO_FILE = 'todos.json';
const BACKUP_DIR = 'backups';


const backup = async () => {
    try {

        await fs.mkdir(BACKUP_DIR, { recursive: true });


        const todos = await readJsonFile(TODO_FILE);


        const backupFile = path.join(BACKUP_DIR, `todos_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`);


        await writeJsonFile(backupFile, todos);

        console.log(`Backup created at ${backupFile}`);
    } catch (error) {
        console.error('Error creating backup:', error.message); 
    }
};


const restore = async (backupFile) => {
    try {

        const todos = await readJsonFile(backupFile);


        await writeJsonFile(TODO_FILE, todos);

        console.log(`Restored tasks from ${backupFile}`);
    } catch (error) {
        console.error('Error restoring backup:', error.message);
    }
};

module.exports = { backup, restore };