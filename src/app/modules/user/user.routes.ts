import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';

const router = Router();

router
  .route('/signup')
  .post(
    validateRequest(UserValidation.createUserValidationSchema),
    userController.signupUser,
  );

export const userRoutes = router;
