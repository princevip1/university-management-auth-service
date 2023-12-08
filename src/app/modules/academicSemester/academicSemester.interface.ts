import { Model } from "mongoose";

type IAcademicSemesterMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';

type IAcademicSemesterCode = '01' | '02' | '03';

type IAcademicSemester = {
    title: IAcademicSemesterTitle;
    year: string;
    code: IAcademicSemesterCode;
    startMonth: IAcademicSemesterMonth;
    endMonth: IAcademicSemesterMonth;
}

type AcademicSemesterModel = Model<IAcademicSemester>;

type IAcademicSemesterFilters = { searchTerm?: string }



export type {
    IAcademicSemester,
    AcademicSemesterModel,
    IAcademicSemesterMonth,
    IAcademicSemesterTitle,
    IAcademicSemesterCode,
    IAcademicSemesterFilters
}