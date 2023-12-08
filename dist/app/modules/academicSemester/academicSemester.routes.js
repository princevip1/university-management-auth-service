"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.route('/')
    .get(academicSemester_controller_1.AcademicSemesterController.getAllSemesters);
// .post(validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController.createSemester)
router.route('/create-semester')
    .get()
    .post((0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.createSemester);
exports.AcademicSemesterRoutes = router;
