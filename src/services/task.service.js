'use strict'

const { ForbiddenError } = require('../core/error.response')
const { taskModel } = require('../models/task.model')
const { getAllTask } = require('./repositories/task.repo')

class TaskService {
    static createTask = async ({name, type, image = ''}) => {
        const newTask = await taskModel.create({
            name,
            type,
            image
        })

        if (!newTask) throw new ForbiddenError('Cant create new Task')
        return 
    }

    static getAllTask = async () => {
        return await getAllTask({select: ['_id', 'name', 'type']})
    }
}

module.exports = TaskService
