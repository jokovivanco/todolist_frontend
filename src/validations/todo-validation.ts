import { z } from 'zod';

export const createSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(100, { message: 'Must be 100 or less characters long' }),
  description: z
    .string()
    .max(255, { message: 'Must be 255 or less characters long' })
    .optional(),
});

export const editSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(100, { message: 'Must be 100 or less characters long' }),
  description: z
    .string()
    .max(255, { message: 'Must be 255 or less characters long' })
    .optional(),
});
