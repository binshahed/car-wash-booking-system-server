import httpStatus from 'http-status';
import { ServiceModel } from '../service/service.model';
import { TSlot } from './slot.interface';
import NotFoundError from '../../errors/NotFoundError';

const createSlot = async (payLoad: TSlot) => {
  const { service: serviceId, startTime, endTime, date } = payLoad;

  // Check if service exists and is not deleted
  const service = await ServiceModel.findById(serviceId);
  if (service?.isDeleted || !service) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  // Calculate slot duration from service
  const slotDuration = service.duration;

  // Calculate start and end times in minutes from midnight
  const startHours = Number(startTime.split(':')[0]);
  const startMinute = Number(startTime.split(':')[1]);
  const endHour = Number(endTime.split(':')[0]);
  const endMinute = Number(endTime.split(':')[1]);

  const startTimeInMinutes = startHours * 60 + startMinute; //570
  const endTimeInMinutes = endHour * 60 + endMinute; // 840

  // Array to store generated slots
  const availableSlots = [];

  // 570
  // 570<840
  //570 = 570+60

  // Generate slots based on slot duration
  for (
    let currentStart = startTimeInMinutes; //570
    currentStart < endTimeInMinutes;
    currentStart = currentStart + slotDuration
  ) {
    //600
    const currentEnd = Math.min(currentStart + slotDuration, endTimeInMinutes);

    // Format start and end times into HH:mm format
    const slotStartHour = Math.floor(currentStart / 60)
      .toString()
      .padStart(2, '0');
    const slotStartMinute = (currentStart % 60).toString().padStart(2, '0');
    const slotEndHour = Math.floor(currentEnd / 60)
      .toString()
      .padStart(2, '0');
    const slotEndMinute = (currentEnd % 60).toString().padStart(2, '0');

    // Create slot object and add to availableSlots array
    availableSlots.push({
      service: serviceId,
      date,
      startTime: `${slotStartHour}:${slotStartMinute}`,
      endTime: `${slotEndHour}:${slotEndMinute}`,
      isBooked: 'available',
    });
  }

  // Log the generated slots (you can remove this in production)
  console.log(availableSlots);
};

export const slotService = {
  createSlot,
};
