"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errorMessages = error.errors.map((error) => {
        var _a;
        return {
            message: error.message,
            path: (_a = error === null || error === void 0 ? void 0 : error.path[(error === null || error === void 0 ? void 0 : error.path.length) - 1]) !== null && _a !== void 0 ? _a : 'general'
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessages
    };
};
exports.default = handleZodError;
