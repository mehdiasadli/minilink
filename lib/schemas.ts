import { z } from 'zod';

export const shortenUrlSchema = z.object({
  url: z
    .string({
      required_error: 'URL is required',
      invalid_type_error: 'URL must be a string',
    })
    .url({
      message: 'URL must be a valid URL',
    }),
});

export type ShortenUrlSchema = z.infer<typeof shortenUrlSchema>;
