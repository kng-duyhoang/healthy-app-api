'use strict'

const { HEADER } = require("../constant")
const {Created, Success} = require("../core/success.response")
const ScheduleService = require("../services/schedule.service")

class ScheduleController {
    create = async (req, res, next) => {
        new Created({
            message: 'Schedule created!!',
            metadata: await ScheduleService.create({
                ...req.body,
                userId: req.headers[HEADER.USER_ID]
            })
        }).send(res)
    }

    getOwnSchedule = async(req, res, next) => {
        new Success({
            message: 'Get Success',
            metadata: await ScheduleService.getScheduleById(req.headers[HEADER.USER_ID])
        }).send(res)
    }

    activeSchedule = async(req, res, next) => {
        new Success({
            message: 'active Success',
            metadata: await ScheduleService.activeSchedule({
                userId: req.headers[HEADER.USER_ID],
                scheduleId: req.params.scheduleId,
                dayStart: req.body.dayStart
            })
        }).send(res)
    }

}

module.exports = new ScheduleController()