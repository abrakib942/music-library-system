import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { UserModel } from '../users/user.model';

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bycrypt_salt_rounds)
    );

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

    const result = await UserModel.signupUser(name, email, hashedPassword);

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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const isLoggedIn = await UserModel.loginUser(email, password);

    const accessToken = jwtHelpers.createToken(
      {
        userId: isLoggedIn?.id,
        email: isLoggedIn?.email,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
      {
        userId: isLoggedIn?.id,
        email: isLoggedIn?.email,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.send({
      success: true,
      statusCode: 200,
      message: 'user login successfully',
      data: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  signupUser,
  loginUser,
};
