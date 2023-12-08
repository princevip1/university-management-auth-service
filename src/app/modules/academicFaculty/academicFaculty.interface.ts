import { Model } from "mongoose";


type IAcademicFaculty = {
    title: string,
}

type AcademicFacultyModel = Model<IAcademicFaculty>;

type IAcademicFacultyFilters = { searchTerm?: string }


export type {
    IAcademicFaculty,
    AcademicFacultyModel,
    IAcademicFacultyFilters
}