import { z } from 'zod';

const signUpUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

const loginUserSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'email is required',
      })
      .optional(),
    password: z
      .string({
        required_error: 'password is required',
      })
      .optional(),
  }),
});

export const UserValidation = {
  signUpUserSchema,
  loginUserSchema,
  updateUserSchema,
};
