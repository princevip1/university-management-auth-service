import mongoose from "mongoose"
import { IGenericErrorMessage } from "../interfaces/error"
import { IGenericErrorResponse } from "../interfaces/common"

const handleCastError = (error: mongoose.Error.CastError): IGenericErrorResponse => {


    const errors: IGenericErrorMessage[] = [{
        message: 'Invalid ID',
        path: error.path
    }]

    return {
        statusCode: 400,
        message: 'Validation error',
        errorMessages: errors,
    }
}

export default handleCastError