"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { revalidatePath } from "next/cache";
import { FolderZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { createClient } from "@/lib/supabase/server";


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
    const { name, parentId } = data;
    let newFolder;

    try {
        newFolder = await db.folder.create({
            data: {
                name,
                parentId,
                userId
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newFolder }
}

export const createFolder = createSafeAction(FolderZodSchema, create);