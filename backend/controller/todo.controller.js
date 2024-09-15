const Todo = require("../model/todo.model");


const addTask = async(req,res) => {
    try{

        const {title, description, completed, date, timePeriod} = req.body;

        if(!title || !description || !date || !timePeriod){
            return res.status(404).json({error: "All fields are required"})
        }

        const newTask = new Todo({
            title,
            description,
            date,
            timePeriod,
            completed
        })

        if(newTask){
            await newTask.save();

            res.status(201).json({
            _id: newTask.id,
            title: newTask.title,
            description : newTask.description,
            date: newTask.date,
            timePeriod: newTask.timePeriod,
            completed: newTask.completed
            })
        }
        else {
            res.status(400).json({ error: "Invalid data" })
        }

    }
    catch(err){
        console.log('err in addTask', err);
        res.status(500).json({error: "Internal server error"})
    }
}

const getAllTasks = async(req,res) => {
    try{

        const allTasks = await Todo.find() ;

        if(allTasks.length === 0){
            return res.status(404).json({ message: "No tasks found" });
        }

        res.status(200).json({allTasks, total: allTasks.length});

    }
    catch(err){
        console.log('err in get all tasks', err);
        res.status(500).json({error: "Internal server error"})
    }
}

const getTaskById = async(req,res) => {
    try{

        const  _id = req.params.id;

        console.log('id', _id)

        const task = await Todo.findById({_id});

        console.log('task', task)
        if(!task){
            return res.status(404).json({error: "task not found"})
        }

        if(task){
            res.status(200).json({
                _id: task._id,
                title: task.title,
                description : task.description,
                date: task.date,
                timePeriod: task.timePeriod,
                completed: task.completed

            })
        }

    }
    catch(err){
        console.log('err in get all tasks', err);
        res.status(500).json({error: "Internal server error"})
    }
}

const updateTask = async (req, res) => {
    try {
        const _id = req.params.id;

        const updatedFields = { ...req.body };

        const updatedTask = await Todo.findByIdAndUpdate(_id, updatedFields, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Error in updateTask:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deleteTask = async(req,res) => {
    try{
        const id = req.params.id;

        console.log('deleteId', id);
        
        if(!id){
            return res.status(400).json({error: "id not found"});
        }

        const task = await Todo.findByIdAndDelete({_id: id});

        console.log('task', task)
        if(task){
            res.status(200).json({message: "Task deleted successfully"})
        }

    }
    catch(err){
        console.log('err in deleteTask', err);
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {addTask, getAllTasks, getTaskById, updateTask, deleteTask}

