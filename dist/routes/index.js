"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../app/modules/user/user.routes");
const academicSemester_routes_1 = require("../app/modules/academicSemester/academicSemester.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes
    },
    {
        path: '/academic-semesters',
        route: academicSemester_routes_1.AcademicSemesterRoutes
    }
];
moduleRoutes.forEach(moduleRoute => {
    router.use(moduleRoute.path, moduleRoute.route);
});
exports.default = router;
