import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester, IAcademicSemesterFilters } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { iGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {

  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid code for title')
  }

  const result = await AcademicSemester.create(payload)
  return result
}


const getAllSemesters = async (paginationOption: IPaginationOptions, filters: IAcademicSemesterFilters): Promise<iGenericResponse<IAcademicSemester[]>> => {

  const { searchTerm, ...filterData } = filters
  const academicSemesterSearchableFields = ['title', 'code', 'year']
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i'
        }
      }))
    })
  }

  if (Object.keys(filterData).length > 0) {
    {
      andConditions.push({
        $and: Object.entries(filterData).map(([key, value]) => ({
          [key]: value
        }))
      })
    }
  }

  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOption)
  const sortConditions: Record<string, SortOrder> = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find(andConditions.length > 0 ? {
    $and: andConditions
  } : {}).sort(sortConditions).skip(skip).limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  }
}

const getSemesterById = async (id: string): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSemester = async (id: string, payload: Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {
  if (payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid code for title')
  }
  const result = await AcademicSemester.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: payload
    },
    {
      new: true
    }
  )
  return result
}

const deleteAcademicSemester = async (id: string): Promise<void> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found')
  }

}



export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteAcademicSemester
}
