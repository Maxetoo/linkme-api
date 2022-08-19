const { UnauthorisedError } = require('../errors')
const jwt = require('jsonwebtoken')
const authUser = (req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken || !authToken.startsWith('Bearer '))
        throw new UnauthorisedError('not authorised')
    const token = authToken.split(' ')[1]
    const getToken = jwt.verify(token, process.env.JWT_SECRET)
    const { id, user } = getToken
    req.user = {
        user_id: id,
        username: user,
    }
    next()
}

module.exports = authUser