const { StatusCodes } = require('http-status-codes')
const CustomError = require('./error')
class BadRequestError extends CustomError {
    constructor(message, status) {
        super(message, status)
        this.message = message
        this.status = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError