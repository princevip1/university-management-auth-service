import { Schema, model } from 'mongoose'
import { AcademicDepartmentModel, IAcademicDepartment } from './academicDepartment.interface'


const academicDepaetmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    }
  },
)



// 3. Create a Model.
export const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>('AcademicDepartment', academicDepaetmentSchema)

