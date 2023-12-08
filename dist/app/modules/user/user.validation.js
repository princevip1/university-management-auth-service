"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            role: zod_1.z.string({
                required_error: "Role is required"
            }).refine((data) => {
                return data === "admin" || data === "user";
            }, {
                message: "Role must be either admin or user"
            }),
        }),
        password: zod_1.z.string().optional(),
    })
});
exports.UserValidation = {
    createUserZodSchema
};
