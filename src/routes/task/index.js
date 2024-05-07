'use strict'

const express = require('express')
const { asyncHandle } = require('../../helpers')
const taskController = require('../../controllers/task.controller')
const router = express.Router()

router.post('/create', asyncHandle(taskController.createTask))
router.get('/get-all-task', asyncHandle(taskController.getAllTask))

module.exports = router