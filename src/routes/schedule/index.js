'use strict'

const express = require('express')

const { asyncHandle } = require('../../helpers')
const scheduleController = require('../../controllers/schedule.controller')
const { authentication } = require('../../auth/auth.utils')
const router = express.Router()

router.use(authentication)
router.post('/create', asyncHandle(scheduleController.create))
router.get('/get-schedule', asyncHandle(scheduleController.getOwnSchedule))
router.get('/get-schedule/:scheduleId', asyncHandle(scheduleController.getOwnScheduleById))
router.post('/active-schedule/:scheduleId', asyncHandle(scheduleController.activeSchedule))
router.patch('/active-schedule/:scheduleId', asyncHandle(scheduleController.updateSchedule))

module.exports = router