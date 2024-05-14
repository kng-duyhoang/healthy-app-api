'use strict'

const {model, Schema} = require("mongoose");

const DOCUMENT_NAME = 'taskActive'
const COLLECTION_NAME= 'tasksActive'

const taskActiveSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    isDone: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    taskActiveModel: model(DOCUMENT_NAME, taskActiveSchema)
}