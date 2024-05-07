'use strict'

const { userModel } = require("../models/users.model")

class UserService {
    static findUserByPhone = async ({phone, select = {
        phone: 1, password: 1, name: 1, status: 1, roles: 1,
    }}) => {
        return await userModel.findOne({phone}).select(select).lean()
    }

    static findUserById = async ({userId, select = {
        phone: 1, password: 1, name: 1, status: 1, roles: 1,
    }}) => {
        return await userModel.findById(userId).select(select).lean()
    }
}

module.exports = UserService