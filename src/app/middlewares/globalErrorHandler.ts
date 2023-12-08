import { ErrorRequestHandler } from "express"
import { IGenericErrorMessage } from "../../interfaces/error"
import config from "../../config"
import handleValidationError from "../../errors/handleValidationError"
import ApiError from "../../errors/ApiError"
import { ZodError } from "zod"
import handleZodError from "../../errors/handleZodError"
import handleCastError from "../../errors/handleCastError"

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = 500
    let message = 'Something went wrong'
    let errorMessages: IGenericErrorMessage[] = []

    if (error.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (error.name === 'CastError') {
        const simplifiedError = handleCastError(error)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (error instanceof ApiError) {
        statusCode = error.statusCode
        message = error.message
        errorMessages = error.message ? [{
            message: error.message,
            path: 'general'
        }] : [
            {
                message: 'Something went wrong',
                path: 'general'

            }]
    }
    else if (error instanceof Error) {
        message = error.message,
            errorMessages = error.message ? [{
                message: error.message,
                path: 'general'
            }] : [
                {
                    message: 'Something went wrong',
                    path: 'general'

                }]

    }
    else {
        message = 'Something went wrong',
            errorMessages = [{
                message: 'Something went wrong',
                path: 'general'
            }]
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors: errorMessages,
        stack: config.env === 'development' ? error.stack : undefined
    })
    next()
}


export default globalErrorHandler