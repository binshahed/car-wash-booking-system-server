import { Router } from 'express';
import { slotController } from './slot.controller';

const router = Router();

router.route('/availability').get(slotController.getAvailableSlots);

export const slotRouter = router;
