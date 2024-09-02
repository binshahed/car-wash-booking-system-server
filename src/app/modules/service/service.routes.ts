import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { serviceController } from './service.controller';
import { slotController } from '../slot/slot.controller';
import { SlotValidation } from '../slot/slot.validation';
import auth from './../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth('admin'),
    validateRequest(ServiceValidation.createServiceValidation),
    serviceController.createService,
  )
  .get(serviceController.getAllServices);

router
  .route('/admin')
  .get(auth('admin'), serviceController.getAllServicesAdmin);

router
  .route('/:id')
  .get(serviceController.getServiceById)
  .patch(
    auth('admin'),
    validateRequest(ServiceValidation.updateServiceValidation),
    serviceController.updateServiceById,
  )
  .delete(auth('admin'), serviceController.deleteServiceById);

router
  .route('/slots')
  .post(
    auth('admin'),
    validateRequest(SlotValidation.createSlotValidation),
    slotController.createSlot,
  );

export const serviceRouter = router;
