/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

import AppError from '../../errors/AppError';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { paymentService } from './payment.service';
import path from 'path';

// create a new Review
const successPayment = catchAsync(async (req, res) => {
  const paymentInfoToken = req.query.secret as string;

  const token = jwt.verify(
    paymentInfoToken,
    config.paymentSignatureKey as string,
  );

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid payment info token');
  }

  const { transactionId, booking, amount } = token as {
    transactionId: string;
    booking: string;
    amount: number;
  };

  const result = await paymentService.successPayment({
    transactionId,
    booking,
    amount,
  });

  if (result.exists as boolean) {
    // Redirect to the specified URL if payment already exists
    return res.redirect(
      'https://car-wash-booking-system-client-opal.vercel.app/',
    );
  }

  // Using path.resolve to ensure the path is absolute
  // const filePath = path.resolve(__dirname, '../../templates/success.html');

  res.sendFile(result?.file as any, (err) => {
    if (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send('Could not load the success page.');
    }
  });
});

// get all Review
const failedPayment = catchAsync(async (req, res) => {
  const result = await paymentService.getAllReviews();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment failed',
    data: result,
  });
});

export const paymentController = {
  successPayment,
  failedPayment,
};
