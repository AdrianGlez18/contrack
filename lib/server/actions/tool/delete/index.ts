"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { ToolZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const handleDelete = async (data: InputType): Promise<OutputType> => {
    
    const { userId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    };

    let toolToDelete;

    const { id: toolId } = data;

    try {
        toolToDelete = await db.tool.delete({
            where: {
                id: toolId,
                userId
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    revalidatePath('/tools');
    return { data: toolToDelete }
}

export const deleteTool = createSafeAction(ToolZodSchema, handleDelete);