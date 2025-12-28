import { z } from "zod";



export const loginSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "Invalid email address" }),

    password: z
        .string({ required_error: "Password is Required" })
        .min(7, { message: "Password must be at least 7 chars." })
        .max(255, { message: "Password must not be more than 255 chars." })
});

export const signupSchema = loginSchema.extend({
    name: z
        .string({ required_error: "Name is Required" })
        .trim()
        .min(3, { message: "Name must be at least 3 chars." })
        .max(255, { message: "Name must not be more than 255 chars." }),
    email: z
        .string({ required_error: "email is Required" })
        .trim()
        .email({ message: "Invalid email address" }),
    password: z
        .string({ required_error: "Password is Required" })
        .min(7, { message: "Password must be at least 7 chars." })
        .max(255, { message: "Password must not be more than 255 chars." })
});