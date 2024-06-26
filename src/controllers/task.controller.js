'use strict'

const {Created, Success} = require("../core/success.response")
const TaskService = require("../services/task.service")

class TaskController {
    createTask = async (req, res, next) => {
        new Created({
            message: 'task created!!',
            metadata: await TaskService.createTask(req.body)
        }).send(res)
    }

    getAllTask = async (req, res, next) => {
        new Success({
            message: 'get success',
            metadata: await TaskService.getAllTask()
        }).send(res)
    }

    getTaskActiveById = async (req, res, next) => {
        new Success({
            message: 'get success',
            metadata: await TaskService.getTaskActiveById(req.params.taskId)
        }).send(res)
    }

    updateTaskById = async (req, res, next) => {
        new Success({
            message: 'get success',
            metadata: await TaskService.getTaskActiveById(req.body)
        }).send(res)
    }
}

module.exports = new TaskController()