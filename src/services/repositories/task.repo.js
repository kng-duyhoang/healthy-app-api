const { taskModel } = require("../../models/task.model")
const { taskActiveModel } = require("../../models/taskActive")
const { selectData, convertToObjectId } = require("../../utils")

const getAllTask = async ({select}) => {
    return await taskModel.find().select(selectData(select))
}

const createMultiActiveTask = async (items) => {
    return await taskActiveModel.insertMany(items)
}

const findTaskActiveById = async (taskId) => {
    return await taskActiveModel.findOne({'_id': convertToObjectId(taskId)})
}

const updateTaskById = async (params) => {
    // return await taskActiveModel.up
}

module.exports = {
    getAllTask,
    createMultiActiveTask,
    findTaskActiveById,
    updateTaskById
}