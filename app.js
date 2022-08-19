require('express-async-errors')
require('dotenv').config()

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const AuthRouter = require('./routes/auth')
const PostRouter = require('./routes/post')
const authUser = require('./middlewares/authentication')
const NotFoundController = require('./middlewares/not-found')
const MiddlewareError = require('./middlewares/error')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
    })
)
app.use(helmet())
app.use(cors())

// routers
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/post', authUser, PostRouter)
app.use(NotFoundController)
app.use(MiddlewareError)
    // port
const port = process.env.PORT || 3000

const startApp = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(port, () => console.log(`app is listening at port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

startApp()