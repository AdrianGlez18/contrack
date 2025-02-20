"use server";

import { InputType, OutputType } from "./types";
//import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/server/db";
import { revalidatePath } from "next/cache";
import { ToolZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { getFallbackIcon } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";


const create = async (data: InputType): Promise<OutputType> => {
    console.log("before userId") 
    const { userId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    };
    console.log("after userId")
    
    const { title, url } = data;
    
    const iconUrl = getFallbackIcon(url);
    console.log("title, url, icon", title, url, iconUrl)
    let newTool;

    console.log("before try")

    try {
        console.log("in try")
        newTool = await db
        .tool.create({
            data: {
                title,
                url,
                iconUrl,
                userId
            }
        })
        console.log("after create try")
    } catch (error) {
        console.log("in error", error)
        return {
            error: "Internal database error"
        }
    }
    console.log("before revalidate")
    revalidatePath(`/folders`);
    revalidatePath(`/tools`);
    console.log("after revalidate")
    return { data: newTool }
}

export const createTool = createSafeAction(ToolZodSchema, create);