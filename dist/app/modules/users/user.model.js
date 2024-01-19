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
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const db_1 = __importDefault(require("../../db/db"));
function signupUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [name, email, password]);
        return result.rows[0];
    });
}
function getUniqueUser(name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM users WHERE name = $1 OR email = $2', [name, email]);
        return result.rows[0];
    });
}
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default.query('SELECT * FROM users WHERE email = $1 ', [
            email,
        ]);
        if (!user.rows[0]) {
            throw new ApiError_1.default(400, 'User not found. Please check your email and try again.');
        }
        const matchedPassword = yield bcrypt_1.default.compare(password, user.rows[0].password);
        if (!matchedPassword) {
            throw new ApiError_1.default(400, 'Incorrect password. Please try again.');
        }
        return user.rows[0];
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM users');
        return result.rows;
    });
}
function getSingleUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM users WHERE id = $1', [
            userId,
        ]);
        return result.rows[0];
    });
}
// async function updateUser(userId: string, updatedFields?: any) {
//   const { name, email, password } = updatedFields;
//   let hashedPassword;
//   if (password) {
//     hashedPassword = await bcrypt.hash(
//       password,
//       Number(config.bycrypt_salt_rounds)
//     );
//   }
//   const result = await pool.query(
//     'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
//     [name, email, hashedPassword, userId]
//   );
//   return result.rows[0];
// }
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
        return result.rows[0];
    });
}
exports.UserModel = {
    signupUser,
    getUniqueUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    // updateUser,
    deleteUser,
};
