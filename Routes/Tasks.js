const express = require('express');
const { createTask, getTask, getTasks, updateTask, deleteTask, singleTask, getAllTasks } = require('../Controller/Tasks.js');
const taskRouter = express.Router();


taskRouter.post("/task/register", createTask)
taskRouter.get("/task/get/:id", singleTask)
taskRouter.patch("/task/update/:id", updateTask )
taskRouter.get("/tasks/all", getAllTasks )
taskRouter.delete("/task/delete/:id", deleteTask)

module.exports = taskRouter