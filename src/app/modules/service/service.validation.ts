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

export const ServiceValidation = { createServiceValidation };
