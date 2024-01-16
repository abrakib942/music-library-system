import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { UserModel } from './user.model';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserModel.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await UserModel.getSingleUser(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

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

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await UserModel.deleteUser(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getSingleUser,
  //   updateUser,
  deleteUser,
};
