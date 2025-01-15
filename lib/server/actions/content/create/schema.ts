import { z } from "zod";

export const ContentZodSchema = z.object({
    title: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title text is required"
    }),
    url: z.string({
        required_error: "URL is required.",
        invalid_type_error: "Must be a valid URL"
    }),
    description: z.string().optional(),
    notes: z.string().optional(),
    folderId: z.string().optional(),
    tags: z.array(z.string()).optional(),
    completed: z.boolean(),
    rating: z.number().optional(),
    contentType: z.enum(["VIDEO", "ARTICLE", "SERIES"]),
})
