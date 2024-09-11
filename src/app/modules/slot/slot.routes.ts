import { Router } from 'express';
import { slotController } from './slot.controller';
import auth from './../../middlewares/auth';

const router = Router();

router.route('/availability').get(slotController.getAvailableSlots);

router
  .route('/:id')
  .get(slotController.getSlotById)
  .patch(auth('admin', 'user'), slotController.updateSlotStatus);

export const slotRouter = router;
