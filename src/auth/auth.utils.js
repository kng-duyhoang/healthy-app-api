'use strict'
const JWT = require('jsonwebtoken')
const { AuthNotFound } = require('../core/error.response')
const { findUserID } = require('../services/key.services')
const { asyncHandle } = require('../helpers')

const HEADER = {
    USER_ID: 'userid',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'refreshtoken'
  }

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                // console.log('err::', err);
            } else {
                // console.log('decode', decode);
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        return error
    }
}

const authentication = asyncHandle(async (req, res, next) => {
    const userId = req.headers[HEADER.USER_ID]
    if (!userId) throw new AuthFailureError('Invalid Request')
    const keyStore = await findUserID( userId )
    if (!keyStore) throw new AuthNotFound('Not found key store')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')

    const refreshToken = req.headers[HEADER.REFRESHTOKEN]
    if (refreshToken) {
        try {
            const decodeUser = JWT.verify( refreshToken, keyStore.privateKey )
            if (userId !== decodeUser.userId && !decodeUser) {
                throw new AuthFailureError('Invalid User')
            }
            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refreshToken
            return next();
        } catch (error) {
            throw error
        }
    }

})

module.exports = {
    createTokenPair,
    authentication
}