class AppError extends Error {
    errstatus: string
    constructor(statusCode: number, message: string, errstatus: string) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.errstatus = errstatus
        Error.captureStackTrace(this, this.constructor)
    }

    statusCode = 500
    status = 'error'
    isOperational = true
}

export default AppError
