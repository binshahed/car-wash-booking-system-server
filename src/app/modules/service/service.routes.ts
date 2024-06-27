import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { serviceController } from './service.controller';
import { slotController } from '../slot/slot.controller';
import { SlotValidation } from '../slot/slot.validation';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(ServiceValidation.createServiceValidation),
    serviceController.createService,
  )
  .get(serviceController.getAllServices);

router
  .route('/:id')
  .get(serviceController.getServiceById)
  .patch(
    validateRequest(ServiceValidation.updateServiceValidation),
    serviceController.updateServiceById,
  )
  .delete(serviceController.deleteServiceById);

router
  .route('/slots')
  .post(
    validateRequest(SlotValidation.createSlotValidation),
    slotController.createSlot,
  );

export const serviceRouter = router;
