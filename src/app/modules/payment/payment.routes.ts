import { Router } from 'express';

import { paymentController } from './payment.controller';

const router = Router();

router.route('/success').get(paymentController.successPayment);

export const paymentRouter = router;
