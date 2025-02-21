import { ToolsWrapper } from "@/components/tools-wrapper"
import { MobileHeader } from "@/components/mobile-header"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getTools } from "@/lib/server/queries"


export default async function ToolsPage() {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/login");
    }

    const title = "Tools"

    const tools = await getTools();

    return (
        <>
            <MobileHeader title={title} />
            <ToolsWrapper title={title} initialTools={tools} />
        </>
    )
}

