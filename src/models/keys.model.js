'use strict'

const {model, Schema } = require("mongoose");

const DOCUMENT_NAME = 'key'
const COLLECTION_NAME= 'keys'

const keyTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true
    },
    refreshTokensUsed: {
        type: Array, // da dc su dung
        default: [],
    },
    refreshToken: {
        type: String,
        required: true
    },
}, {
    collection: DOCUMENT_NAME,
    timestamps: true
})

module.exports = {
    keyModel: model(COLLECTION_NAME, keyTokenSchema)
}
