import express from 'express';
import { UserRoutes } from '../app/modules/user/user.routes';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoutes
    }
]

moduleRoutes.forEach(moduleRoute => {
    router.use(moduleRoute.path, moduleRoute.route);
});

export default router;