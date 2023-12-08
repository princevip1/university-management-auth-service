import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()

router.route('/')
    .get(AcademicFacultyController.getAllFaculties)
    .post(validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema), AcademicFacultyController.createFaculty)



router.route('/:id')
    .get(AcademicFacultyController.getFacultyById)
    .patch(validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema), AcademicFacultyController.updateFaculty)
    .delete(AcademicFacultyController.deleteAcademicFaculty)


export const AcademicFacultyRoutes = router
