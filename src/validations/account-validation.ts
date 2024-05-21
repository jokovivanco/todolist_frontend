import { z } from 'zod';

export const settingSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(100, { message: 'Must be 100 or less characters long' })
      .optional(),
    currentPassword: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(100, { message: 'Must be 100 or less characters long' }),
    newPassword: z
      .string()
      .max(100, { message: 'Must be 100 or less characters long' })
      .optional(),
    confirmNewPassword: z
      .string()
      .max(100, { message: 'Must be 100 or less characters long' })
      .optional(),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmNewPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmNewPassword'],
    },
  );
