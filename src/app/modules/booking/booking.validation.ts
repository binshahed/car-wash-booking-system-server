import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    serviceId: z.string({ message: 'Service is required.' }),
    slotId: z.string({ message: 'Slot is required.' }),
    vehicleType: z.enum(
      [
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
      { message: 'Vehicle type is required.' },
    ),
    vehicleBrand: z.string({ message: 'Vehicle brand is required.' }),
    vehicleModel: z.string({ message: 'Vehicle model is required.' }),
    manufacturingYear: z
      .number()
      .int()
      .min(1886, { message: 'Manufacturing year must be a valid year.' }),
    registrationPlate: z.string({ message: 'Registration plate is required.' }),
  }),
});

export const BookingValidation = {
  createBookingSchema,
};
