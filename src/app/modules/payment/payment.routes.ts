import { Router } from 'express';

import { paymentController } from './payment.controller';

const router = Router();

router.route('/success').post(paymentController.successPayment);
router.route('/test').post(paymentController.testPayment);

export const paymentRouter = router;
