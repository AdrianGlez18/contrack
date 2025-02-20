import { z } from "zod";

export const UserZodSchema = z.object({
    userId: z.string({
        required_error: "userId is required.",
        invalid_type_error: "userId text is required"
    }),
    email: z.string({
        required_error: "Email is required.",
        invalid_type_error: "Must be a valid email"
    }),
})
