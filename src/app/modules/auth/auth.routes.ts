import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './auth.validation';
import { userController } from './auth.controller';

const router = Router();

router
  .route('/signup')
  .post(
    validateRequest(UserValidation.createUserValidationSchema),
    userController.signupUser,
  );

router
  .route('/login')
  .post(
    validateRequest(UserValidation.loginValidationSchema),
    userController.loginUser,
  );

export const authRoutes = router;
