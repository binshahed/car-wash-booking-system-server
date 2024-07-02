import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer is required.'],
      ref: 'User',
    },
    service: {
      type: Schema.Types.ObjectId,
      required: [true, 'Service is required.'],
      ref: 'Service',
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: [true, 'Slot is required.'],
      ref: 'Slot',
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required.'],
      trim: true,
      enum: [
        'car',
        'truck',
        'SUV',
        'van',
        'motorcycle',
        'bus',
        'electricVehicle',
        'hybridVehicle',
        'bicycle',
        'tractor',
      ],
    },
    vehicleBrand: {
      type: String,
      required: [true, 'Vehicle brand is required.'],
    },
    vehicleModel: {
      type: String,
      required: [true, 'Vehicle model is required.'],
    },
    manufacturingYear: {
      type: Number,
      required: [true, 'Manufacturing year is required.'],
    },
    registrationPlate: {
      type: String,
      required: [true, 'Registration plate is required.'],
    },
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<TBooking>('Booking', bookingSchema);
