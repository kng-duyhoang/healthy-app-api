'use strict'

const express = require('express')
const router = express.Router()

router.use('/v1/api/user', require('./access'))
router.use('/v1/api/task', require('./task'))
router.use('/v1/api/schedule', require('./schedule'))

module.exports = router
