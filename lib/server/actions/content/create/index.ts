"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { ContentZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { createClient } from "@/lib/supabase/server";
//https://www.youtube.com/watch?v=pbJf5fKLRK8

const create = async (data: InputType): Promise<OutputType> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) {
        return {
            error: "Unauthorized"
        }
    }

    const userId = user.id;
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
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    //revalidatePath(`/board/${board.id}`);
    return { data: newContent }
}

export const createContent = createSafeAction(ContentZodSchema, create);