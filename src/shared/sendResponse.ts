import { Response } from "express";

type IApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    data?: T | null
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    const responseData: IApiResponse<T> = {
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data || null,
        statusCode: data.statusCode

    }
    res.status(data.statusCode).json(responseData)
}


export default sendResponse