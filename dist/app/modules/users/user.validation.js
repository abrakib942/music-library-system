"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const signUpUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'name is required',
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .optional(),
        password: zod_1.z
            .string({
            required_error: 'password is required',
        })
            .optional(),
    }),
});
exports.UserValidation = {
    signUpUserSchema,
    loginUserSchema,
    updateUserSchema,
};
