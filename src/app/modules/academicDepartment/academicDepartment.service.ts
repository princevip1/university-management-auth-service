import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { iGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'
import { AcademicDepartment } from './academicDepartment.model'
import { IAcademicDepartment, IAcademicDepartmentFilters } from './academicDepartment.interface'

const createDepartment = async (payload: IAcademicDepartment): Promise<IAcademicDepartment> => {

  const result = await AcademicDepartment.create(payload)
  return result
}


const getAllDepartments = async (paginationOption: IPaginationOptions, filters: IAcademicDepartmentFilters): Promise<iGenericResponse<IAcademicDepartment[]>> => {

  const { searchTerm, ...filterData } = filters
  const academicSemesterSearchableFields = ['title', 'academicFaculty']
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

  const result = await AcademicDepartment.find(andConditions.length > 0 ? {
    $and: andConditions
  } : {}).sort(sortConditions).skip(skip).limit(limit).populate('academicFaculty')
  const total = await AcademicDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  }
}

const getDepartmentById = async (id: string): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id)
  return result
}

const updateDepartment = async (id: string, payload: Partial<IAcademicDepartment>): Promise<IAcademicDepartment | null> => {

  const result = await AcademicDepartment.findOneAndUpdate(
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

const deleteAcademicDepartment = async (id: string): Promise<void> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found')
  }

}



export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteAcademicDepartment
}
