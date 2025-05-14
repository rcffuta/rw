// /lib/validations/auth.ts

import { z } from "zod";

export const contactSchema = z.object({
    firstname: z.string({required_error: "Firstname is required"}).min(2, "Firstname must be at least 3 characters"),
    lastname: z.string({required_error: "Lastname is required"}).min(2, "Lastname must be at least 3 characters"),
    subject: z.string().min(10, "Subject must be at least 10 characters"),
    email: z.string({required_error: "Email is required"}).email("Invalid email"),
    message: z
        .string({required_error: "Message is required"})
        .min(10, "Message must be at least 10 letters")
        // .max(15, "Phone number must not exceed 15 digits")
        // .regex(/^\+?[0-9]+$/, "Phone number can only contain numbers and optional +"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
