import { Schema, model } from 'mongoose'
import { AcademicFacultyModel, IAcademicFaculty } from './academicFaculty.interface';


const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
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
export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>('AcademicFaculty', academicFacultySchema)

