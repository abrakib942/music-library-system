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
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../users/user.model");
const signupUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
        const isUserExist = yield user_model_1.UserModel.getUniqueUser(name, email);
        if (isUserExist) {
            if (isUserExist.name === name) {
                throw new ApiError_1.default(400, 'Name already exists. Please choose another name.');
            }
            else if (isUserExist.email === email) {
                throw new ApiError_1.default(400, 'Email already exists. Please use a different email.');
            }
        }
        const result = yield user_model_1.UserModel.signupUser(name, email, hashedPassword);
        res.send({
            success: true,
            statusCode: 200,
            message: 'Users created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isLoggedIn = yield user_model_1.UserModel.loginUser(email, password);
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({
            userId: isLoggedIn === null || isLoggedIn === void 0 ? void 0 : isLoggedIn.id,
            email: isLoggedIn === null || isLoggedIn === void 0 ? void 0 : isLoggedIn.email,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
            userId: isLoggedIn === null || isLoggedIn === void 0 ? void 0 : isLoggedIn.id,
            email: isLoggedIn === null || isLoggedIn === void 0 ? void 0 : isLoggedIn.email,
        }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.send({
            success: true,
            statusCode: 200,
            message: 'user login successfully',
            data: accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    signupUser,
    loginUser,
};
