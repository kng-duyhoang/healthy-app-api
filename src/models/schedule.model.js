'use strict'

const {model, Schema, Types} = require("mongoose");

const DOCUMENT_NAME = 'schedule'
const COLLECTION_NAME= 'schedules'

const sheduleSchema = new Schema({
    name: {
        type: String,
        maxLength: 150,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['day', 'week']
    },
    items: {
        type: Array,

        default: []
    },
    userCreated: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    scheduleModel: model(DOCUMENT_NAME, sheduleSchema),
}