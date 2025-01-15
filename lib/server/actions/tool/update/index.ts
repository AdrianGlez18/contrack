"use server"

import { auth } from "@clerk/nextjs/server";
import { InputType, OutputType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateBoardSchema } from "./schema";
import { createSafeAction } from "@/lib/actions/createSafeAction";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = await auth();

    if(!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const {title, id} = data;
    let board;

    try {
     board = await db.boardModel.update({
            where: {
                id,
                orgId
            },
            data: {
                title
            }
        });
    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }

    revalidatePath(`/board/${id}`)
    return {data: board};
}

export const updateBoard = createSafeAction(UpdateBoardSchema, handler);