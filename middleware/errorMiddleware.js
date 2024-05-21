//buat error handle yang global dulu 
exports.notFound = (req, res, next) => {
    const error = new Error(`not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

exports.errorHandle = (err, req, res, next) => {
    //jika status tidak dimasukkan di error handlenya
    let statusCode = req.statusCode === 200 ? 500 : res.statusCode
    let message = err.message
    if (err.errors || err.name == 'SequelizeValidatorError') {
        const errorList = err.errors.map((err) => {
            let obj = {}
            obj[Error.path] = err.message
            return obj
        })
        message = errorList
        statusCode = 400
    }
    res.status(statusCode).json({
        message,
        stack: err.stack
    })
    next()
}