const User = require('../models/auth')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const register = async(req, res) => {
    const { name, email, password, age } = req.body
    if (!name || !email || !password || !age)
        throw new BadRequestError('please fill up all credentials')
    const user = await User.create({...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        username: name,
        token,
    })
}

const login = async(req, res) => {
    const { email, password } = req.body
        // check validation
    if (!email || !password)
        throw new BadRequestError('please fill up all credentials')
            // check if email exists
    const user = await User.findOne({ email })
    if (!user) throw new BadRequestError('invalid email')

    const passwordValid = await user.checkPassword(password)
    if (!passwordValid) throw new BadRequestError('invalid password')
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        username: user.name,
        token,
    })
}

module.exports = {
    register,
    login,
}