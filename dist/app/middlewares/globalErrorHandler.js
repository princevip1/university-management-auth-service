"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if (error.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.message ? [{
                message: error.message,
                path: 'general'
            }] : [
            {
                message: 'Something went wrong',
                path: 'general'
            }
        ];
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
                }
            ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errors: errorMessages,
        stack: config_1.default.env === 'development' ? error.stack : undefined
    });
    next();
};
exports.default = globalErrorHandler;
