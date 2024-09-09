/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import PaymentModel from './payment.model';
import { join } from 'path';
import { readFileSync } from 'fs';

const successPayment = async (payLoad: any) => {
  const isPaymentExist = await PaymentModel.findOne({
    booking: payLoad.booking,
  });

  if (isPaymentExist) {
    return { exists: true };
  }

  const payment = await PaymentModel.create(payLoad);
  if (!payment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment is not created');
  }

  const filePath = join(__dirname, '../../templates/success.html');
  let file = readFileSync(filePath, 'utf-8');
  file = file.replace(
    '{{link}}',
    'https://car-wash-booking-system-client-opal.vercel.app/',
  );

  return { exists: false, file };
};

const getAllReviews = async () => {
  const review = PaymentModel.find().populate('customer');
  if (!review) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No reviews found');
  }

  return review;
};

export const paymentService = {
  successPayment,
  getAllReviews,
};
