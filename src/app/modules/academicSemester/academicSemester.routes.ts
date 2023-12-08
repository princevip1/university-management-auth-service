import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.route('/')
    .get(AcademicSemesterController.getAllSemesters)
// .post(validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController.createSemester)
router.route('/create-semester')
    .get()
    .post(validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController.createSemester)

router.route('/:id')
    .get(AcademicSemesterController.getSemesterById)
    .patch(validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema), AcademicSemesterController.updateSemester)
    .delete(AcademicSemesterController.deleteAcademicSemester)


export const AcademicSemesterRoutes = router
