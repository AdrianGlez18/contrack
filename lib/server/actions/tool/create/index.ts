"use server";

import { InputType, OutputType } from "./types";
//import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/server/db";
import { revalidatePath } from "next/cache";
import { ToolZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { createClient } from "@/lib/supabase/server";
import { getFallbackIcon } from "@/lib/utils";


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
    const { title, url } = data;
    const iconUrl = getFallbackIcon(url);
    let newTool;

    try {
        newTool = await db.tool.create({
            data: {
                title,
                url,
                iconUrl,
                userId
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    //revalidatePath(`/board/${board.id}`);
    return { data: newTool }
}

export const createTool = createSafeAction(ToolZodSchema, create);