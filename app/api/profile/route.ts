"use server"

import { db } from "@/lib/server/db";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export default async function handler() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const id = user?.id;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }

    try {
        const prismaProfile = await db.prismaUser.findUnique({
            where: { supabaseAuthId: id },
            include: {
                content: true,
                folders: true,
                tools: true,
            },
        });

        if (!prismaProfile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(prismaProfile);
    } catch (error) {
        console.error('Error fetching profile 2:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export const GET = handler
//export const POST = handler