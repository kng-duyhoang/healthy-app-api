'use strict'

const express = require('express')
const { asyncHandle } = require('../../helpers')
const accessController = require('../../controllers/access.controller')
const { authentication } = require('../../auth/auth.utils')
const router = express.Router()

router.post('/signup', asyncHandle(accessController.signUp))
router.post('/login', asyncHandle(accessController.logIn))

router.use(authentication)
router.get('/get-self', asyncHandle(accessController.getSelf))
router.post('/', asyncHandle(accessController.handleRefreshToken))

module.exports = router