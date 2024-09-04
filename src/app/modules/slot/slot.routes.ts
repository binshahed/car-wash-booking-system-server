import { Router } from 'express';
import { slotController } from './slot.controller';

const router = Router();

router.route('/availability').get(slotController.getAvailableSlots);

router
  .route('/:id')
  .get(slotController.getSlotById)
  .patch(slotController.updateSlotStatus);

export const slotRouter = router;
