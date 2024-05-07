const { taskModel } = require("../../models/task.model")
const { selectData } = require("../../utils")

const getAllTask = async ({select}) => {
    return await taskModel.find().select(selectData(select))
}

module.exports = {
    getAllTask
}