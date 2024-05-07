'use strict'
const _ = require('lodash')
const { Types } = require('mongoose')

const getInforData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}

const convertToObjectId = id => new Types.ObjectId(id)

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

const selectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}

module.exports = {
    getInforData,
    convertToObjectId,
    validateEmail,
    getAge,
    selectData,
    StatusCodes: require('./statusCodes.js'),
    ReasonPhrases: require('./reasonPhrases'),
}