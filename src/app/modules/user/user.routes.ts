import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.route('/').get(auth('admin'), userController.getAllUsers);
router
  .route('/me')
  .get(auth('admin', 'user'), userController.getMe)
  .patch(auth('admin', 'user'), userController.updateProfile);

router.route('/:id').patch(auth('admin'), userController.updateUserStatus);

export const userRouter = router;
