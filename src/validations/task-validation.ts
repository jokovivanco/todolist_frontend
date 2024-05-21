import { z } from 'zod';

export const createSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(100, { message: 'Must be 100 or less characters long' }),
});

export const editSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(100, { message: 'Must be 100 or less characters long' }),
});
