const { taskModel } = require("../../models/daySchedule.model")
const { selectData } = require("../../utils")

const getAllTask = async ({select}) => {
    return await taskModel
    .find()
    .select(selectData(select))
}

module.exports = {
    getAllTask
}