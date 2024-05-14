'use strict'

const { BadRequestError, NotFoundError, NotAcceptAble, ForbiddenError } = require('../core/error.response')
const {scheduleModel} = require('../models/schedule.model')
const { scheduleActiveModel } = require('../models/scheduleActive')
const { userModel } = require('../models/users.model')
const { convertToObjectId, convertArrObjToArrId } = require('../utils')
const { getScheduleById, findScheduleById, createScheduleActive, findScheduleActiveByUserId, getAllScheduleById } = require('./repositories/schedule.repo')
const { createMultiActiveTask } = require('./repositories/task.repo')

class ScheduleService {
    static create = async ({name, type, items, userId}) => {
        const createdSchedule = await scheduleModel.create({
            name,
            type,
            items,
            userCreated: convertToObjectId(userId)
        })

        if(!createdSchedule) throw new BadRequestError('Error')

        return
    }

    static getOwnSchedule= async (userId) => {
        return await getAllScheduleById({userId, select: ['_id', 'name']})
    }

    static getScheduleById = async ({userId, scheduleId}) => {
        return await getScheduleById({userId, scheduleId, select: ['_id', 'name', 'items']})
    }

    static activeSchedule = async ({userId, scheduleId, dayStart}) => {

        const foundScheduleActive = await findScheduleActiveByUserId(convertToObjectId(userId))
        if (foundScheduleActive) throw new NotAcceptAble('user is current active schedule')
        
        const foundSchedule = await findScheduleById(convertToObjectId(scheduleId))
        if (!foundSchedule) throw new NotFoundError("not existed Schedule")
        const newItems = []

        foundSchedule.items.forEach(ele => {
            newItems.push({
                ...ele,
                isDone: false
            })
        })

        const insertManyTask = await createMultiActiveTask(newItems)
        const newTaskActiveList = convertArrObjToArrId(insertManyTask, '_id')

        const createActiveSchedule = await createScheduleActive({
            scheduleId,
            items: newTaskActiveList,
            userId,
            dayStart
        })

      return {
        scheduleActive: createActiveSchedule
      }
    }

    static updateSheduleActive = async ({scheduleId}) => {
        const foundScheduleActive = scheduleActiveModel.findOne({_id: scheduleId})
        if (!foundScheduleActive) throw new ForbiddenError('not found')
       
        
    }
}

module.exports = ScheduleService
