'use strict'

const { isEmptyObj } = require("../helpers")
const { StatusCodes, ReasonPhrases } = require("../utils")


class SuccessStatusResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonStatusCode = ReasonPhrases.OK,
        metadata = {},
        tokens = {}
    }) {
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode,
        this.metadata = metadata
        this.tokens = tokens
    }

    send(res, headers = {}) {
        console.log(this);
        const returnData = {...this}
        if(isEmptyObj(returnData.tokens)) {
            delete returnData.tokens
        }
        if(isEmptyObj(returnData.metadata)) {
            delete returnData.metadata
        }
        return res.status(this.status).json( returnData )
    }
}

class Success extends SuccessStatusResponse {
    constructor({message, metadata, tokens}) {
        super({message, metadata, tokens})
    }
}

class Created extends SuccessStatusResponse {
    constructor({message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, metadata, tokens}) {
        super({message, statusCode, reasonStatusCode, metadata, tokens})
    }
}

module.exports = {
    Success,
    Created,
}
