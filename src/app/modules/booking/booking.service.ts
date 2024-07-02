/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBookingInput } from './booking.interface';
import { BookingModel } from './booking.model';
import { ServiceModel } from '../service/service.model';
import { SlotModel } from '../slot/slot.model';
import mongoose from 'mongoose';
import NotFoundError from '../../errors/NotFoundError';

const createBooking = async (payloadUser: any, payload: TBookingInput) => {
  const {
    serviceId,
    slotId,
    manufacturingYear,
    registrationPlate,
    vehicleBrand,
    vehicleModel,
    vehicleType,
  } = payload;

  // find service
  const service = await ServiceModel.findById(payload.serviceId);
  if (!service) {
    throw new NotFoundError(httpStatus.BAD_REQUEST, 'Service not found!');
  }

  //find slot
  const slot = await SlotModel.findById(payload.slotId);
  if (!slot) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Slot not found');
  }
  // checking if slot is already booked
  if (slot.isBooked === 'booked') {
    throw new AppError(httpStatus.CONFLICT, 'Slot is already booked');
  }

  // transition and role back
  // start session
  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    // create new booking object
    const newBooking = {
      customer: payloadUser._id,
      service: serviceId,
      slot: slotId,
      manufacturingYear,
      registrationPlate,
      vehicleBrand,
      vehicleModel,
      vehicleType,
    };

    // update slot available to booked
    await SlotModel.findOneAndUpdate(
      { _id: slotId },
      { $set: { isBooked: 'booked' } },
      { session, new: true },
    );
    // create new booking
    const booking = await BookingModel.create([newBooking], { session });

    // if booking not success

    if (!booking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
    }

    // populate customer, service and slot details
    const result = await booking[0].populate([
      { path: 'customer', select: '-role -createdAt -updatedAt' },
      { path: 'service', select: '-createdAt -updatedAt -__v' },
      { path: 'slot', select: '-createdAt -updatedAt -__v' },
    ]);

    // end session
    await session.commitTransaction();
    await session.endSession();

    // return result with populated customer, service and slot details
    return result;
  } catch (err: any) {
    // rollback session in case of error
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const getAllBookings = async () => {
  const result = await BookingModel.find().populate([
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
