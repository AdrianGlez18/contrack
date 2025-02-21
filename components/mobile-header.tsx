import { getFolders } from "@/lib/server/queries";
import { buildFolderTree } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import ThemeButton from "./theme-button";

export const MobileHeader = async ({title}: {title: string}) => {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/login");
    }

    const folders = await getFolders();
    const rootFolders = folders.filter((folder: any) => !folder.parentId);
    const folderTree = rootFolders.map((folder: any) => buildFolderTree(folders, folder));

    return (
        <div className="w-full flex items-center justify-between my-2 px-4 lg:hidden h-16">
            <MobileSidebar folderTree={folderTree} />
            <h1 className="text-foreground text-2xl font-bold">{title}</h1>
            <div className="flex items-center gap-4">
                <ThemeButton />
                <UserButton />
            </div>
        </div>
    )
}
