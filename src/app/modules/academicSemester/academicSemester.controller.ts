import { Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/paginationFields'
import { IAcademicSemester } from './academicSemester.interface'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createSemester(academicSemesterData)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester Created Successfully",
    data: result
  })
})


const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year'])
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicSemesterService.getAllSemesters(paginationOptions, filters)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester fetch Successfully",
    meta: result.meta,
    data: result.data
  })

})

const getSemesterById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicSemesterService.getSemesterById(id)
  sendResponse<IAcademicSemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester fetch Successfully",
    data: result
  })
})


const updateSemester = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const { ...semesterData } = req.body
  const result = await AcademicSemesterService.updateSemester(id, semesterData)
  sendResponse<IAcademicSemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester Updated Successfully",
    data: result
  })
})

const deleteAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await AcademicSemesterService.deleteAcademicSemester(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester Deleted Successfully",
  })
})


export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteAcademicSemester
}
