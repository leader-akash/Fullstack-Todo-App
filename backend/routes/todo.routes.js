const express = require('express');
const { addTask, getAllTasks, updateTask, deleteTask, getTaskById } = require('../controller/todo.controller');

const router = express.Router();

router.post("/addTask", addTask);
router.get("/getAllTasks", getAllTasks);
router.get("/getTaskById/:id", getTaskById);
router.put("/updateTaskById/:id", updateTask);
router.delete("/deleteTaskById/:id", deleteTask);



module.exports = router;