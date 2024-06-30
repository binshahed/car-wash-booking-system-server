import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';
import { dateRegex, timeRegex } from './slot.const';

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    date: {
      type: String,
      required: [true, 'Date is required.'],
      match: [dateRegex, 'Invalid date format. Expected format: YYYY-MM-DD.'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required.'],
      match: [timeRegex, 'Invalid start time format. Expected format: HH:MM.'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required.'],
      match: [timeRegex, 'Invalid end time format. Expected format: HH:MM.'],
    },
    isBooked: {
      type: String,
      enum: {
        values: ['available', 'booked', 'canceled'],
        message:
          'isBooked must be either "available", "booked", or "canceled".',
      },
      default: 'available',
      required: [true, 'Booking status is required.'],
    },
  },
  { timestamps: true },
);

export const SlotModel = model<TSlot>('Slot', slotSchema);
