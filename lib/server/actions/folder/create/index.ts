"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { revalidatePath } from "next/cache";
import { FolderZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { auth } from "@clerk/nextjs/server";


const create = async (data: InputType): Promise<OutputType> => {
    const { userId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    };
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
        
        revalidatePath('/folders');
        revalidatePath('/content');
        revalidatePath('/');
        
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newFolder }
}

export const createFolder = createSafeAction(FolderZodSchema, create);