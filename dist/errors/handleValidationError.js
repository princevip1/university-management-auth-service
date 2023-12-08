"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((value) => {
        return {
            message: value.message,
            path: value.path
        };
    });
    return {
        statusCode: 400,
        message: 'Validation error',
        errorMessages: errors,
    };
};
exports.default = handleValidationError;
