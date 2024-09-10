/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBookingInput } from './booking.interface';
import { BookingModel } from './booking.model';
import { ServiceModel } from '../service/service.model';
import { SlotModel } from '../slot/slot.model';
import mongoose from 'mongoose';
import NotFoundError from '../../errors/NotFoundError';
import { paymentResponse } from '../payment/payment.utils';

const createBooking = async (payloadUser: any, payload: TBookingInput) => {
  // Find service
  const service = await ServiceModel.findById(payload.serviceId);
  if (!service) {
    throw new NotFoundError(httpStatus.BAD_REQUEST, 'Service not found!');
  }

  // Find slot
  const slot = await SlotModel.findById(payload.slotId);
  if (!slot) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Slot not found');
  }

  // Check if slot is already booked
  if (slot.isBooked === 'booked') {
    throw new AppError(httpStatus.CONFLICT, 'Slot is already booked');
  }

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Define booking data
    const newBooking = {
      customer: payloadUser._id,
      service: payload.serviceId,
      slot: payload.slotId,
      manufacturingYear: payload.manufacturingYear,
      registrationPlate: payload.registrationPlate,
      vehicleBrand: payload.vehicleBrand,
      vehicleModel: payload.vehicleModel,
      vehicleType: payload.vehicleType,
    };

    // Update slot to booked
    await SlotModel.findOneAndUpdate(
      { _id: payload.slotId },
      { $set: { isBooked: 'booked' } },
      { session, new: true },
    );

    // Create new booking
    const booking = await BookingModel.create([newBooking], { session });

    if (!booking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
    }

    // Populate booking details
    await booking[0].populate([
      { path: 'customer', select: '-role -createdAt -updatedAt' },
      { path: 'service', select: '-createdAt -updatedAt -__v' },
      { path: 'slot', select: '-createdAt -updatedAt -__v' },
    ]);

    const payment = await paymentResponse(
      payloadUser,
      booking[0]._id,
      service?.price,
    );

    // Check if payment was successful based on response

    await session.commitTransaction();
    return payment;
  } catch (err: any) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  } finally {
    // End the session
    await session.endSession();
  }
};

const getAllBookings = async () => {
  const result = await BookingModel.find()
    .sort({ createdAt: 'desc' })
    .populate([
      { path: 'customer', select: '-role -createdAt -updatedAt' },
      { path: 'service', select: '-createdAt -updatedAt -__v' },
      { path: 'slot', select: '-createdAt -updatedAt -__v' },
    ]);

  if (result.length === 0) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Bookings not found');
  }

  return result;
};

const getMyBookings = async (customerId: string) => {
  const result = await BookingModel.find({ customer: customerId }).populate([
    { path: 'customer', select: '-role -createdAt -updatedAt' },
    { path: 'service', select: '-createdAt -updatedAt -__v' },
    { path: 'slot', select: '-createdAt -updatedAt -__v' },
  ]);

  if (result.length === 0) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'No Bookings found');
  }

  return result;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
