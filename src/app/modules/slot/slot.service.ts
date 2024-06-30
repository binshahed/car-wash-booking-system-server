import httpStatus from 'http-status';
import { ServiceModel } from '../service/service.model';
import { TSlot } from './slot.interface';
import NotFoundError from '../../errors/NotFoundError';
import AppError from '../../errors/AppError';
import { SlotModel } from './slot.model';

const createSlot = async (payLoad: TSlot) => {
  const { service: serviceId, startTime, endTime, date } = payLoad;

  // Check if service exists and is not deleted
  const service = await ServiceModel.findById(serviceId);

  if (!service) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  if (service?.isDeleted) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Service is deleted!');
  }

  // Check if slot for this day already exists
  const findSlot = await SlotModel.findOne({ date: date });
  if (findSlot?.date === date) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Slot has already been created for this day.',
    );
  }

  // Calculate slot duration from service
  const slotDuration = service.duration;

  // convert time string to minutes
  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // convert minutes to time string
  const convertMinutesToTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  };

  // convert time string to minutes and check if it's a valid time range
  const startTimeInMinutes = convertTimeToMinutes(startTime);
  const endTimeInMinutes = convertTimeToMinutes(endTime);

  const totalTimeInMinutes =
    endTimeInMinutes - startTimeInMinutes + slotDuration;

  if (endTimeInMinutes < startTimeInMinutes) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'End time cannot be earlier than start time!',
    );
  }

  // count total slots

  const totalSlot = Math.floor(totalTimeInMinutes / slotDuration);

  // check given time range is valid
  if (totalSlot < 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Selected service cannot cover multiple slots!',
    );
  }

  // create slots
  const slots = [];

  for (let i = 0; i < totalSlot; i++) {
    const slotStartTime = convertMinutesToTimeString(
      startTimeInMinutes + i * slotDuration,
    );

    const endTimeSlot = convertMinutesToTimeString(
      startTimeInMinutes + (i + 1) * slotDuration,
    );

    const newSlot = {
      service: serviceId,
      date,
      startTime: slotStartTime,
      endTime: endTimeSlot,
      isBooked: 'available',
    };

    slots.push(newSlot);
  }

  const result = SlotModel.create(slots);

  return result;
};

const getAvailableSlots = async (payload: {
  date?: string;
  serviceId?: string;
}) => {
  const query: { date?: string; service?: string } = {};

  if (payload?.date) {
    query.date = payload.date;
  }
  if (payload?.serviceId) {
    query.service = payload.serviceId;
  }

  const result = await SlotModel.find({
    ...query,
    isBooked: 'available',
  }).populate('service');

  if (result.length === 0) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Slots not found!');
  }
  return result;
};

export const slotService = {
  createSlot,
  getAvailableSlots,
};
