import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/paginationFields'
import { AcademicDepartmentService } from './academicDepartment.service'
import { IAcademicDepartment } from './academicDepartment.interface'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.createDepartment(academicDepartmentData)
  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Department Created Successfully",
    data: result
  })
})


const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'academicFaculty'])
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicDepartmentService.getAllDepartments(paginationOptions, filters)
  sendResponse<IAcademicDepartment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Department fetch Successfully",
    meta: result.meta,
    data: result.data
  })

})

const getDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.getDepartmentById(id)
  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Department fetch successfully",
    data: result
  })
})


const updateDepartment = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const { ...departmentData } = req.body
  const result = await AcademicDepartmentService.updateDepartment(id, departmentData)
  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Department Updated Successfully",
    data: result
  })
})

const deleteAcademicDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await AcademicDepartmentService.deleteAcademicDepartment(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Department delete successfully",
  })
})


export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteAcademicDepartment
}
