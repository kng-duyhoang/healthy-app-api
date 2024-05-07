'use strict'

const {model, Schema, Types} = require("mongoose");

const DOCUMENT_NAME = 'scheduleActive'
const COLLECTION_NAME= 'schedulesActive'

const sheduleActiveSchema = new Schema({
    scheduleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'schedule'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    items: {
        type: Array,
        default: []
    },
    dayStart: {
        type: Date,
        required: true
    },
    userActive: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    scheduleActiveModel: model(DOCUMENT_NAME, sheduleActiveSchema),
}