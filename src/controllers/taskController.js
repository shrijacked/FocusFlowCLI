const Task = require('../models/Task');
const { z } = require('zod');


const taskSchema = z.object({
    description: z.string().min(1, { message: "description is required" }),
    priority: z.number().optional(),
    dueDate: z.string().optional(),
    category: z.string().optional(),
    recurring: z.boolean().optional(),
});


exports.addTask = async (req, res) => {
    try {
        // validate the request body using zod
        const { description, priority, dueDate, category, recurring } = taskSchema.parse(req.body);
        
        // create a new task instance
        const newTask = new Task({
            description,
            priority,
            dueDate,
            category,
            recurring,
            userId: req.user._id,
        });
        
        // save the task to the database
        const task = await newTask.save();
        
        
        res.status(201).json(task);
    } catch (err) {
        
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err.errors });
        }
        
        console.error(err.message);
        res.status(500).json({ error: 'server error' });
    }
};


exports.getAllTasks = async (req, res) => {
    try {
        // find tasks by user id
        const tasks = await Task.find({ userId: req.user._id });
        
        
        res.json(tasks);
    } catch (err) {
        
        console.error(err.message);
        res.status(500).json({ error: 'server error' });
    }
};


exports.getTaskById = async (req, res) => {
    try {
        // find task by id
        const task = await Task.findById(req.params._id);
        
        
        if (!task) return res.status(404).json({ error: 'task not found' });
        
        // send the task as response
        res.json(task);
    } catch (err) {
        
        console.error(err.message);
        res.status(500).json({ error: 'server error' });
    }
};


exports.updateTask = async (req, res) => {
    try {
        // validate the request body using zod
        const { description, priority, dueDate, category, recurring, done } = taskSchema.parse(req.body);
        
        // find task by id
        const task = await Task.findById(req.params._id);
        
        if (!task) return res.status(404).json({ error: 'task not found' });

        // update task fields
        task.description = description || task.description;
        task.priority = priority !== undefined ? priority : task.priority;
        task.dueDate = dueDate || task.dueDate;
        task.category = category || task.category;
        task.recurring = recurring !== undefined ? recurring : task.recurring;
        task.done = done !== undefined ? done : task.done;
        task.updatedAt = Date.now();

        
        await task.save();
        
        
        res.json(task);
    } catch (err) {
        
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err.errors });
        }
        
        console.error(err.message);
        res.status(500).json({ error: 'server error' });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        
        const task = await Task.findById(req.params._id);
        
        
        if (!task) return res.status(404).json({ error: 'task not found' });

        
        await task.remove();
        
        
        res.json({ message: 'task removed' });
    } catch (err) {
        
        console.error(err.message);
        res.status(500).json({ error: 'server error' });
    }
};