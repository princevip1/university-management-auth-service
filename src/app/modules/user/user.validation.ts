import { z } from "zod";


const createUserZodSchema = z.object({
    body: z.object({
        user: z.object({
            role: z.string({
                required_error: "Role is required"
            }).refine((data) => {
                return data === "admin" || data === "user"
            }, {
                message: "Role must be either admin or user"
            }),
        }),
        password: z.string().optional(),
    })
})

export const UserValidation = {
    createUserZodSchema
}