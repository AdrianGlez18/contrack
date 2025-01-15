import { z } from "zod";

export const ToolZodSchema = z.object({
    title: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title text is required"
    }),
    url: z.string({
        required_error: "URL is required.",
        invalid_type_error: "Must be a valid URL"
    }),
    iconUrl: z.string({
        required_error: "URL is required.",
        invalid_type_error: "Must be a valid URL"
    }),
})
