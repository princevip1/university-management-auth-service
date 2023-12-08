import { ZodError } from "zod";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericErrorMessage } from "../interfaces/error";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
    const errorMessages: IGenericErrorMessage[] = error.errors.map((error) => {
        return {
            message: error.message,
            path: error?.path[error?.path.length - 1] ?? 'general'
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessages
    };
}

export default handleZodError