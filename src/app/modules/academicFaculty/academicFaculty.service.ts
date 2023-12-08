import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { iGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'
import { AcademicFaculty } from './academicFaculty.model'
import { IAcademicFaculty, IAcademicFacultyFilters } from './academicFaculty.interface'

const createFaculty = async (payload: IAcademicFaculty): Promise<IAcademicFaculty> => {

  const result = await AcademicFaculty.create(payload)
  return result
}


const getAllFaculties = async (paginationOption: IPaginationOptions, filters: IAcademicFacultyFilters): Promise<iGenericResponse<IAcademicFaculty[]>> => {

  const { searchTerm, ...filterData } = filters
  const academicSemesterSearchableFields = ['title']
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

  const result = await AcademicFaculty.find(andConditions.length > 0 ? {
    $and: andConditions
  } : {}).sort(sortConditions).skip(skip).limit(limit)
  const total = await AcademicFaculty.countDocuments()
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  }
}

const getFacultyById = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateFaculty = async (id: string, payload: Partial<IAcademicFaculty>): Promise<IAcademicFaculty | null> => {

  const result = await AcademicFaculty.findOneAndUpdate(
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

const deleteAcademicFaculty = async (id: string): Promise<void> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found')
  }

}



export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteAcademicFaculty
}
