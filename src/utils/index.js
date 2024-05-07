'use strict'
const _ = require('lodash')
const { Types } = require('mongoose')

const getInforData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}

const convertToObjectId = id => new Types.ObjectId(id)


module.exports = {
    getInforData,
    convertToObjectId,
    StatusCodes: require('./statusCodes.js'),
    ReasonPhrases: require('./reasonPhrases'),
}