const Todo = require("../model/todo.model");

// Add Task
const addTask = async (req, res) => {
    try {
        const { title, description, completed, date, timePeriod } = req.body;

        if (!title || !description || !date || !timePeriod) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newTask = new Todo({
            title,
            description,
            date,
            timePeriod,
            completed,
            user: req.user._id // Set user reference
        });

        await newTask.save();

        res.status(201).json({
            _id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            date: newTask.date,
            timePeriod: newTask.timePeriod,
            completed: newTask.completed,
            userId: newTask.user,
            message: "Task created successfully 🎉"
        });
    } catch (err) {
        console.log('Error in addTask:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get All Tasks for the current user
const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Todo.find({ user: req.user._id }); // Filter by user

        if (allTasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }

        res.status(200).json({ allTasks, total: allTasks.length });
    } catch (err) {
        console.log('Error in getAllTasks:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Task by ID
const getTaskById = async (req, res) => {
    try {
        const _id = req.params.id;

        const task = await Todo.findOne({ _id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        console.log('Error in getTaskById:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const _id = req.params.id;

        const updatedFields = { ...req.body };

        const updatedTask = await Todo.findOneAndUpdate({ _id, user: req.user._id }, updatedFields, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({...updatedTask, message: "Task updated successfully"});
    } catch (err) {
        console.error('Error in updateTask:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const _id = req.params.id;

        const task = await Todo.findOneAndDelete({ _id, user: req.user._id }); // Filter by user

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.log('Error in deleteTask:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addTask, getAllTasks, updateTask, deleteTask, getTaskById };
