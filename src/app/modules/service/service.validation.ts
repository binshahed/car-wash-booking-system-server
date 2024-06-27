import { z } from 'zod';

const createServiceValidation = z.object({
  body: z.object({
    name: z.string({ message: 'Service name is required' }),
    description: z.string({ message: 'Service description is required' }),
    price: z.number({ message: 'Service price is required' }),
    duration: z.number({ message: 'Service duration is required' }),
    isDelete: z.boolean().optional(),
  }),
});
const updateServiceValidation = z.object({
  body: z.object({
    name: z.string({ message: 'Service name is required' }).optional(),
    description: z
      .string({ message: 'Service description is required' })
      .optional(),
    price: z.number({ message: 'Service price is required' }).optional(),
    duration: z.number({ message: 'Service duration is required' }).optional(),
    isDelete: z.boolean().optional(),
  }),
});

export const ServiceValidation = {
  createServiceValidation,
  updateServiceValidation,
};
