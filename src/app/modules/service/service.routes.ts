import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { serviceController } from './service.controller';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(ServiceValidation.createServiceValidation),
    serviceController.createService,
  )
  .get(serviceController.getAllServices);

export const serviceRouter = router;
