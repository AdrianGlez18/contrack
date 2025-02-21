import { redirect } from "next/navigation"
import { buildFolderTree } from "@/lib/utils"
import { AddContentForm } from "@/components/add-content-form"
import { auth } from "@clerk/nextjs/server"
import { getFolders } from "@/lib/server/queries"

//Todo get foldertree desde el server. 
//todo Mover form a un componente aparte llamado add-content-form
export default async function AddContentPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const folders = await getFolders();
  const rootFolders = folders.filter((folder: any) => !folder.parentId);
  const folderTree = rootFolders.map((folder: any) => buildFolderTree(folders, folder));

  return (
    <div className="w-full py-8 overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Content</h1>
        <p className="text-muted-foreground mt-2">
          Add a new piece of content to your library
        </p>
      </div>

      <AddContentForm folderTree={folderTree} />
    </div>
  )
}