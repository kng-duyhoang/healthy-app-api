'use strict'
const crypto = require('node:crypto')

const asyncHandle = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}


const generateToken = () => {
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')
    return { privateKey, publicKey }
}

module.exports = {
    asyncHandle,
    generateToken
}