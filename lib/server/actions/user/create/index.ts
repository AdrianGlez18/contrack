"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { UserZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
import { auth } from "@clerk/nextjs/server";

const create = async (data: InputType): Promise<OutputType> => {

    const { userId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    };
    
    const { email } = data;

    let newUser;

    try {
        newUser = await db.prismaUser.create({
            data: {
                email,
                userId
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    //revalidatePath(`/board/${board.id}`);
    return { data: newUser }
}

export const createContent = createSafeAction(UserZodSchema, create);