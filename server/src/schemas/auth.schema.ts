import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(60, { message: 'Name cannot exceed 60 characters' }),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email address' })
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email address' })
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
