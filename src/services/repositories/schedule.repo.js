const { scheduleModel } = require("../../models/schedule.model")
const { scheduleActiveModel } = require("../../models/scheduleActive")
const { convertToObjectId } = require("../../utils")
const { selectData } = require("../../utils")

const getScheduleById = async ({userId, select}) => {
    return await scheduleModel
    .find({userCreated: convertToObjectId(userId)})
    .select(selectData(select))
}

const findScheduleById = async (id) => {
    return await scheduleModel.findOne(id)
}

const createScheduleActive = async ({scheduleId, items, userId, dayStart }) => {
    return await scheduleActiveModel.create({
        isActive: true,
        scheduleId,
        items,
        userActive: userId,
        dayStart
    })
}

const findScheduleActiveByUserId = async (userActive) => {
    return await scheduleActiveModel.findOne({
        userActive
    })
}

module.exports = {
    getScheduleById,
    findScheduleById,
    createScheduleActive,
    findScheduleActiveByUserId
}