const { StatusCodes } = require('http-status-codes')
const CustomError = require('./error')
class NotFoundError extends CustomError {
    constructor(message, status) {
        super(message, status)
        this.message = message
        this.status = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError