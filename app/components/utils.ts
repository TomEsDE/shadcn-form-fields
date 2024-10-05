import { z } from 'zod';

export const Schema = z.object({
  username: z.string().min(3, 'Name must be at least 3 characters long'),
  password: z.string().min(8, 'Password needs at least 8 characters'),
  country: z
    .string({
      required_error: 'Please select a country.',
    })
    .optional(),
});

export type SchemaType = z.infer<typeof Schema>;

export const resetValues: SchemaType = {
  username: '',
  password: '',
  country: '',
  // age: 14,
};
