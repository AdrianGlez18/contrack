"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { ContentZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const edit = async (data: InputType): Promise<OutputType> => {
    const { userId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    };

    const { id, title, url, contentType, description, notes, rating, tags, folderId, completed } = data;

    let updatedContent;

    try {
        updatedContent = await db.content.update({
            where: { id, userId },
            data: {
                title,
                url,
                type: contentType,
                description,
                notes,
                rating,
                tags,
                completed,
                folderId,
                userId
            }
        });

        if (folderId) {
            revalidatePath(`/folders/${folderId}`);
        }

        revalidatePath(`/content/${id}`);
        revalidatePath('/folders', 'layout');
        
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: updatedContent }
}

export const editContent = createSafeAction(ContentZodSchema, edit); 