import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(100, { message: 'Must be 100 or less characters long' }),
  password: z
    .string()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(100, { message: 'Must be 100 or less characters long' }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(100, { message: 'Must be 100 or less characters long' }),

    name: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(100, { message: 'Must be 100 or less characters long' }),

    password: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(100, { message: 'Must be 100 or less characters long' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(100, { message: 'Must be 100 or less characters long' }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    },
  );
