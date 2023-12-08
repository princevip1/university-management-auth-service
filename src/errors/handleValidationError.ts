import mongoose from "mongoose"
import { IGenericErrorMessage } from "../interfaces/error"
import { IGenericErrorResponse } from "../interfaces/common"

const handleValidationError = (err: mongoose.Error.ValidationError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            message: value.message,
            path: value.path
        }
    }
    )

    return {
        statusCode: 400,
        message: 'Validation error',
        errorMessages: errors,
    }


}


export default handleValidationError