import { z } from 'zod';
import { dateRegex, timeRegex } from './slot.const';

const createSlotValidation = z.object({
  body: z.object({
    service: z.string({
      required_error: 'Service ID is required.',
      invalid_type_error: 'Service ID must be a string.',
    }),
    date: z
      .string({
        required_error: 'Date is required.',
        invalid_type_error: 'Date must be a string.',
      })
      .regex(dateRegex, {
        message: 'Invalid date format. Expected format: YYYY-MM-DD.',
      }),
    startTime: z
      .string({
        required_error: 'Start time is required.',
        invalid_type_error: 'Start time must be a string.',
      })
      .regex(timeRegex, {
        message: 'Invalid start time format. Expected format: HH:MM.',
      }),
    endTime: z
      .string({
        required_error: 'End time is required.',
        invalid_type_error: 'End time must be a string.',
      })
      .regex(timeRegex, {
        message: 'Invalid end time format. Expected format: HH:MM.',
      }),
  }),
});

export const SlotValidation = {
  createSlotValidation,
};
