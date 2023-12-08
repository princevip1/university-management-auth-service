import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/paginationFields'
import { AcademicFacultyService } from './academicFaculty.service'
import { IAcademicFaculty } from './academicFaculty.interface'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createFaculty(academicFacultyData)
  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty Created Successfully",
    data: result
  })
})


const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title'])
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicFacultyService.getAllFaculties(paginationOptions, filters)
  sendResponse<IAcademicFaculty[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty fetch Successfully",
    meta: result.meta,
    data: result.data
  })

})

const getFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.getFacultyById(id)
  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty fetch Successfully",
    data: result
  })
})


const updateFaculty = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const { ...facultyData } = req.body
  const result = await AcademicFacultyService.updateFaculty(id, facultyData)
  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty Updated Successfully",
    data: result
  })
})

const deleteAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await AcademicFacultyService.deleteAcademicFaculty(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty Deleted Successfully",
  })
})


export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteAcademicFaculty
}
