import { buildFolderTree } from "@/lib/utils"
import { getFolders } from "@/lib/server/queries"
import { SidebarStateManager } from "./sidebar-state-manager"
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function Sidebar() {

  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const folders = await getFolders();
  const rootFolders = folders.filter((folder: any) => !folder.parentId);
  const folderTree = rootFolders.map((folder: any) => buildFolderTree(folders, folder));

  return (
    <div className="hidden lg:block pb-12 w-72 border-r shrink-0 max-h-screen">
      <div className="flex flex-col h-screen justify-between">
        <SidebarStateManager folderTree={folderTree} />
        <div className="flex gap-4 items-center justify-start h-16 w-full p-2 ml-4 mb-4">
          <UserButton appearance={{
            elements: {
              avatarBox: "h-10 w-10",
              userButtonBox: "flex-row-reverse text-foreground",
            },
          }} showName={true} />
        </div>
      </div>
    </div>
  )
}

