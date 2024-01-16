import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { UserModel } from '../users/user.model';

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bycrypt_salt_rounds)
    );

    req.body.password = hashedPassword;

    const isUserExist = await UserModel.getUniqueUser(name, email);

    if (isUserExist) {
      if (isUserExist.name === name) {
        throw new ApiError(
          400,
          'Name already exists. Please choose another name.'
        );
      } else if (isUserExist.email === email) {
        throw new ApiError(
          400,
          'Email already exists. Please use a different email.'
        );
      }
    }

    const result = await UserModel.signupUser(name, email, password);

    res.send({
      success: true,
      statusCode: 200,
      message: 'Users created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  signupUser,
};
