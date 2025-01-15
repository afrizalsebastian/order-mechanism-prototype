import { ZodType, z } from 'zod';

export class AdminValidation {
  static readonly CREATE: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1),
  });
}
