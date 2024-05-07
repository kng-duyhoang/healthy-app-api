'use strict'

const express = require('express')
const router = express.Router()

router.use('/v1/api/user', require('./access'))
router.use('/v1/api/task', require('./task'))

module.exports = router
