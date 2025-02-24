import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const getContent = cache(async () => {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const content = await db.content.findMany({
        where: {
            userId
        }
    });
    return content;
});

export const getFolders = cache(async () => {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const folders = await db.folder.findMany({
        where: {
            userId
        }
    });
    return folders;
});

export const getTools = cache(async () => {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const tools = await db.tool.findMany({
        where: {
            userId
        }
    });
    return tools;
});

export const getFolderContent = cache(async (folderId: string) => {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const folderContent = await db.content.findMany({
        where: {
            folderId,
            userId
        }
    });
    return folderContent;
});

export const getFolder = cache(async (folderId: string) => {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const folder = await db.folder.findUnique({
        where: {
            id: folderId,
            userId
        }
    });
    return folder;
});

export const getContentById = cache(async (contentId: string) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const content = await db.content.findUnique({
        where: {
            id: contentId,
            userId
        }
    });
    return content;
});
