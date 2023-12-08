"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: "Title is required"
        }),
        year: zod_1.z.number({
            required_error: "Year is required"
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes], {
            required_error: "Code is required"
        }),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: "Start month is required"
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: "End month is required"
        }),
    }),
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema
};
