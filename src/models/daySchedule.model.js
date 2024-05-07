'use strict'

const {model, Schema} = require("mongoose");

const DOCUMENT_NAME = 'task'
const COLLECTION_NAME= 'tasks'

const taskSchema = new Schema({
    name: {
        type: String,
        maxLength: 150,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['none', 'consumption', 'gain']
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    taskModel: model(DOCUMENT_NAME, taskSchema)
}