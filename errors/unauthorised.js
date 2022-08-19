const { StatusCodes } = require('http-status-codes')
const CustomError = require('./error')
class UnauthorisedError extends CustomError {
    constructor(message, status) {
        super(message, status)
        this.message = message
        this.status = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorisedError