import { ObjectId } from 'mongoose';

export type TSlot = {
  service: ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
};
