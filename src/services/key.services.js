'use strict'

const { keyModel } = require('../models/keys.model')
const { convertToObjectId } = require('../utils')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        const
            filter = { userId: userId },
            update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
            options = { upsert: true, new: true }
        const tokens = await keyModel.findOneAndUpdate(filter, update, options)
        return tokens ? tokens.publicKey : null
    }
    
    static findUserID = async (userId) => {
        return await keyModel.findOne({ userId: userId })
    }

    static deleteKeyByUserID = async (userID) => {
        return await keyModel.deleteOne({ userId: convertToObjectId(userID) })
    }
}

module.exports = KeyTokenService
