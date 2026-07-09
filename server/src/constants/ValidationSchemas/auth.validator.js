import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export const registerSchema = z.object({
  firstName: z.string().min(1, "Name is required"),

  lastName: z.string().min("Last name is required"),

  email: z.email("Invalid email address"),

  password: z.string().min(6, "Password should be at least 6 characters"),

  role: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  username: z.string(),
  newPassword: z.string(),
});
