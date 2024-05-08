'use strict'

const {Created, Success} = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        new Created({
            message: 'Sign up success!!',
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }
    logIn = async (req, res, next) => {
        new Success({
            message: 'Login Success',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }
    getSelf = async (req, res, next) => {
        new Success({
            message: "get Success",
            tokens: req.tokens,
            metadata: await AccessService.getSelf(req.user),
        }).send(res)
    }
    handleRefreshToken = async (req, res, next) => {
        new Success({
            message: 'Handle success',
            metadata: await AccessService.handleRefreshToken({
                refreshToken: req.refreshToken,
                user: req.user,
                keyStore: req.keyStore
            })
        }).send(res)
    }
}

module.exports = new AccessController()