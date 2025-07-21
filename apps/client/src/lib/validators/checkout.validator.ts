// /lib/validations/auth.ts

import { z } from "zod";

export const checkoutSchema = z.object({
  firstname: z.string({required_error: "Firstname is required"}).min(2, "Firstname must be at least 3 characters"),
  lastname: z.string({required_error: "Lastname is required"}).min(2, "Lastname must be at least 3 characters"),
//   address: z.string({required_error: "Address is required"}).min(10, "Address must be at least 10 characters"),
  email: z.string({required_error: "Email is required"}).email("Invalid email"),
  phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .regex(/^\+?[0-9]+$/, "Phone number can only contain numbers and optional +"),
});

// export const checkoutSchema = loginSchema
//   .extend({
//     // firstname: z
//     //   .string({ required_error: "Firstname is required" })
//     //   .min(1, "Firstname is required"),
//     // lastname: z
//     //   .string({ required_error: "Lastname is required" })
//     //   .min(1, "Lastname is required"),
//     username: z
//       .string({ required_error: "Username is required" })
//       .min(3, "Username must be at least 3 characters")
//       .max(20, "Username must not exceed 20 characters"),
    // phoneNumber: z
    //   .string()
    //   .min(10, "Phone number must be at least 10 digits")
    //   .max(15, "Phone number must not exceed 15 digits")
    //   .regex(/^\+?[0-9]+$/, "Phone number can only contain numbers and optional +"),
//     confirmPassword: z
//       .string({ required_error: "Please confirm your password" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });


export type CheckoutFormData = z.infer<typeof checkoutSchema>;
