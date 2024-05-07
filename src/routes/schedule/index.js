'use strict'

const express = require('express')
const { asyncHandle } = require('../../helpers')
const scheduleController = require('../../controllers/schedule.controller')
const { authentication } = require('../../auth/auth.utils')
const router = express.Router()

router.use(authentication)
router.post('/create', asyncHandle(scheduleController.create))
router.get('/get-schedule', asyncHandle(scheduleController.getOwnSchedule))
router.post('/active-schedule/:scheduleId', asyncHandle(scheduleController.activeSchedule))

module.exports = router