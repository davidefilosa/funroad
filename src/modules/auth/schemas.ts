import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z
    .string()
    .min(3)
    .max(63)
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letter, numbers, and hyphens. It must also start and end with a lowercase letter or number."
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens."
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
