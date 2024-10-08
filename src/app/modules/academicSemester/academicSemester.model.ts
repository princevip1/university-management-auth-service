import { Schema, model } from 'mongoose'
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface'
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
import status from 'http-status';


const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    }
  },
)


academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semester already exists')
  }
  next()
})

// 3. Create a Model.
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema)

