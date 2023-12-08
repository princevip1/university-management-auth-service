"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // auto increment id
    const lastUser = yield user_model_1.User.findOne({}, { id: 1, _id: 0 }, { sort: { createdAt: -1 } }).lean();
    user.id = (0, user_utils_1.genareteUserId)(lastUser);
    //default password
    if (!user.password) {
        user.password = config_1.default.defaultUserPassword;
    }
    const result = yield user_model_1.User.create(user);
    if (!result) {
        throw new Error('User could not be created');
    }
    return result;
});
exports.UserService = {
    createUser,
};
