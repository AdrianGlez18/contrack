"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { ToolZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";



const handleDelete = async (data: InputType): Promise<OutputType> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) {
        return {
            error: "Unauthorized"
        }
    }

    let toolToDelete;
    const userId = user.id;
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