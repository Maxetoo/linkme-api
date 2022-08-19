const MiddlewareError = (err, req, res, next) => {
    if (err) {
        return res.status(500).json({ err })
    }
    next()
}

module.exports = MiddlewareError