'use strict'
const JWT = require('jsonwebtoken')
const { AuthNotFound, ForbiddenError } = require('../core/error.response')
const { asyncHandle } = require('../helpers')
const KeyTokenService = require('../services/key.service')
const UserService = require('../services/user.service')
const { HEADER } = require('../constant')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '3d'
        })
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '120d'
        })
        return { accessToken, refreshToken }
    } catch (error) {
        return error
    }
}

const updateToken = async (user, keyStore, refreshToken) => {
    const tokens = await createTokenPair({ userID: user._id, phone: user.phone }, keyStore.publicKey, keyStore.privateKey)
    await keyStore.updateOne({
        $set: {
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken
        },
        $addToSet: {
            refreshTokensUsed: refreshToken
        }
    })
    return tokens
}

const authentication = asyncHandle(async (req, res, next) => {
    const userId = req.headers[HEADER.USER_ID]
    if (!userId) throw new AuthFailureError('Invalid Request')
    const keyStore = await KeyTokenService.findUserID( userId )
    if (!keyStore) throw new AuthNotFound('Not found key store')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthNotFound('Not Found Token')

    const refreshToken = req.headers[HEADER.REFRESHTOKEN]

    if(refreshToken) {
        const decodeUser = JWT.verify( refreshToken, keyStore.privateKey )
        if (userId !== decodeUser.userId && !decodeUser) {
            throw new AuthFailureError('Invalid User')
        }

        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyByUserID(userId)
            throw new ForbiddenError('Something wrong happend!! Pls relogin')
        }

        const foundUser = await UserService.findUserById({userId})
        if (!foundUser) throw new AuthFailureError('User not Found')

        JWT.verify( refreshToken, keyStore.privateKey, async (err, decoded) => {
            if (err) {
                throw new ForbiddenError('Pls relogin')                
            } else {
                JWT.verify( accessToken, keyStore.publicKey, async (err, decoded) => {
                    if (err) {
                        const tokens = await updateToken(foundUser, keyStore, refreshToken)
                        req.tokens = {
                            accessToken: tokens.accessToken,
                            refreshToken: tokens.refreshToken
                        }
                    }
                    req.user = foundUser
                    req.keyStore = keyStore
                    return await next()
                } )
            }
        })
        
    }

})

module.exports = {
    createTokenPair,
    authentication,
}