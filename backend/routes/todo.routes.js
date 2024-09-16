const express = require('express');
const { addTask, getAllTasks, updateTask, deleteTask, getTaskById } = require('../controller/todo.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/addTask", authMiddleware, addTask);
router.get("/getAllTasks", authMiddleware, getAllTasks);
router.get("/getTaskById/:id", authMiddleware, getTaskById);
router.put("/updateTaskById/:id", authMiddleware, updateTask);
router.delete("/deleteTaskById/:id", authMiddleware, deleteTask);

module.exports = router;
