import { z } from "zod";

export const FolderZodSchema = z.object({
    name: z.string({
        required_error: "Name is required.",
        invalid_type_error: "Folder name is required"
    }),
    parentId: z.string().optional(),
})
