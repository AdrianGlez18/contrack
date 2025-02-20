"use server"

import { db } from "@/lib/server/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
    console.log("Fetching profile")
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        console.log("Before findUnique")
        const prismaProfile = await db.prismaUser.findUnique({
            where: { userId },
            include: {
                content: true,
                folders: true,
                tools: true,
            },
        });

        if (!prismaProfile) {
            console.log("!profile")
            const userEmail = user.emailAddresses[0]?.emailAddress;
            if (userEmail) {
                console.log("useremail")
                const newProfile = await db.prismaUser.create({
                    data: {
                        userId,
                        email: userEmail,
                    }
                });

                if (newProfile) {
                    console.log("newprofile")
                    return NextResponse.json(newProfile);
                };
            };
            console.log("!useremail")
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(prismaProfile);
    } catch (error) {
        console.error('Error fetching profile 2:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

//export const GET = handler
//export const POST = handler