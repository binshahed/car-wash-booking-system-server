import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
import auth from './../../middlewares/auth';
import { bookingController } from './booking.controller';

export const bookingRouter = Router();

bookingRouter
  .route('/')
  .post(
    auth('user'),
    validateRequest(BookingValidation.createBookingSchema),
    bookingController.createBooking,
  )
  .get(auth('admin'), bookingController.getAllBookings);

export const myBookingRouter = Router();

myBookingRouter.route('/').get(auth('user'), bookingController.myBooking);
