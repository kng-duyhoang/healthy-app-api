'use strict'

const {model, Schema, Types} = require("mongoose");

const DOCUMENT_NAME = 'user'
const COLLECTION_NAME= 'users'

const ROLEUSER = {
    admin: 'admin',
    user: 'user',
    parent: 'parent',
    teacher: 'teacher',
    staff: 'staff'
}

const shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    userModel: model(DOCUMENT_NAME, shopSchema),
    ROLEUSER
}