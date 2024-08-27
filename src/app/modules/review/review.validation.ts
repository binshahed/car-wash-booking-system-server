import { z } from 'zod';

const createReviewValidation = z.object({
  body: z.object({
    customer: z.string({ message: 'Customer is required' }),
    designation: z.string({ message: 'Designation is required' }),
    rating: z.number({ message: 'Rating is required' }),
    message: z.string({ message: 'Message is required' }),
    isDelete: z.boolean().optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidation,
};
