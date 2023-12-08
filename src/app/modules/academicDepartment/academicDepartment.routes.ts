import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.route('/')
    .get(AcademicDepartmentController.getAllDepartments)
    .post(validateRequest(AcademicDepartmentValidation.createAcademicDepartmentZodSchema), AcademicDepartmentController.createDepartment)



router.route('/:id')
    .get(AcademicDepartmentController.getDepartmentById)
    .patch(validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), AcademicDepartmentController.updateDepartment)
    .delete(AcademicDepartmentController.deleteAcademicDepartment)


export const AcademicDepartmentRoutes = router
