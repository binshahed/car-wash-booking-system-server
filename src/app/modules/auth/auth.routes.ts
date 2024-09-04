import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './auth.validation';
import { authController } from './auth.controller';

const router = Router();

router
  .route('/signup')
  .post(
    validateRequest(UserValidation.createUserValidationSchema),
    authController.signupUser,
  );

router
  .route('/login')
  .post(
    validateRequest(UserValidation.loginValidationSchema),
    authController.loginUser,
  );

export const authRoutes = router;
