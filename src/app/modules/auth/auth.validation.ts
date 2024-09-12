import { z } from 'zod';

// Define the validation schema for creating a user
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
    phone: z.string(),
    address: z.string({ message: 'Address is required' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
  }),
});

// Export the validation schema to use it in other parts of the application
export const UserValidation = {
  createUserValidationSchema,
  loginValidationSchema,
};
