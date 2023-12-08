"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        message: data.message,
        data: data.data || null,
        statusCode: data.statusCode
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
