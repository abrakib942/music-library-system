import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../users/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.signUpUserSchema),
  AuthController.signupUser
);
router.post(
  '/login',
  validateRequest(UserValidation.loginUserSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
