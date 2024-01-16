import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', auth(), UserController.getAllUsers);

router.get('/:id', auth(), UserController.getSingleUser);

// router.patch('/:id', auth(), UserController.updateUser);
router.delete('/:id', auth(), UserController.deleteUser);

export const UserRoutes = router;
