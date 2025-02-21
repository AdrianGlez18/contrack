"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { ContentZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const create = async (data: InputType): Promise<OutputType> => {

    const { userId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    };
    
    const { title, url, contentType, description, notes, rating, tags, folderId, completed } = data;

    let newContent;

    try {
        newContent = await db.content.create({
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
        })
        
        if (folderId) {
            console.log("revalidating ", folderId)
            revalidatePath(`/folders/${folderId}`);
        }
        revalidatePath('/folders', 'layout');
        revalidatePath('/', 'layout');
        
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newContent }
}

export const createContent = createSafeAction(ContentZodSchema, create);