import { z } from "zod";

const createAcademicDepartmentZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        academicFaculty: z.string({
            required_error: "Academic Facilty is required"
        }),
    }),
})

const updateAcademicDepartmentZodSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required"
        })
    }),
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }).optional(),
        academicFaculty: z.string({
            required_error: "Academic Facilty is required"
        }).optional(),
    }),
})

export const AcademicDepartmentValidation = {
    createAcademicDepartmentZodSchema,
    updateAcademicDepartmentZodSchema
}
