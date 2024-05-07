'use strict'

const { BadRequestError, NotFoundError, NotAcceptAble } = require('../core/error.response')
const {scheduleModel} = require('../models/schedule.model')
const { convertToObjectId } = require('../utils')
const { getScheduleById, findScheduleById, createScheduleActive, findScheduleActiveByUserId } = require('./repositories/schedule.repo')

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

    static getScheduleById = async (userId) => {
        return await getScheduleById({userId, select: ['_id', 'name']})
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

        const createActiveSchedule = await createScheduleActive({
            scheduleId,
            items: newItems,
            userId,
            dayStart
        })

      return {
        scheduleActive: createActiveSchedule
      }
    }
}

module.exports = ScheduleService
