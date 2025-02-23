import { redirect } from "next/navigation"
import { buildFolderTree } from "@/lib/utils"
import { AddContentForm } from "@/components/add-content-form"
import { auth } from "@clerk/nextjs/server"
import { getFolders } from "@/lib/server/queries"

export default async function AddContentPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const folders = await getFolders();
  const rootFolders = folders.filter((folder: any) => !folder.parentId);
  const folderTree = rootFolders.map((folder: any) => buildFolderTree(folders, folder));

  return (
      <div className="lg:p-8">
        <div className="mb-8 ml-4 mt-2">
          <h1 className="text-3xl font-bold">Add Content</h1>
          <p className="text-muted-foreground mt-2">
            Add a new piece of content to your library
          </p>
        </div>

      <AddContentForm folderTree={folderTree} />
    </div>
  )
}