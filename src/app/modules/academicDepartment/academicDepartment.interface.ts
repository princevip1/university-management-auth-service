import mongoose, { Model } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";


type IAcademicDepartment = {
    title: string,
    academicFaculty: mongoose.Schema.Types.ObjectId | IAcademicFaculty
}

type AcademicDepartmentModel = Model<IAcademicDepartment, Record<string, unknown>>

type IAcademicDepartmentFilters = { searchTerm?: string }


export type {
    IAcademicDepartment,
    AcademicDepartmentModel,
    IAcademicDepartmentFilters
}