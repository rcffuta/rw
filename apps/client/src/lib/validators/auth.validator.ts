// /lib/validations/auth.ts

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({required_error: "Email is required"}).email("Invalid email"),
  password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema
  .extend({
    // firstname: z
    //   .string({ required_error: "Firstname is required" })
    //   .min(1, "Firstname is required"),
    // lastname: z
    //   .string({ required_error: "Lastname is required" })
    //   .min(1, "Lastname is required"),
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .regex(/^\+?[0-9]+$/, "Phone number can only contain numbers and optional +"),
    confirmPassword: z
      .string({ required_error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export type CreateAccountFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;