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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_model_1 = require("./user.model");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.UserModel.getAllUsers();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Users retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_model_1.UserModel.getSingleUser(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// const updateUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password } = req.body;
//     if (!name && !email && !password) {
//       return sendResponse(res, {
//         statusCode: httpStatus.BAD_REQUEST,
//         success: false,
//         message: 'No fields provided for update',
//       });
//     }
//     const result = await UserModel.updateUser(id, { name, email, password });
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User updated successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_model_1.UserModel.deleteUser(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    getAllUsers,
    getSingleUser,
    //   updateUser,
    deleteUser,
};
