import { buildFolderTree } from "@/lib/utils"
import { getFolders } from "@/lib/server/queries"
import { SidebarStateManager } from "./sidebar-state-manager"

//todo fix active section highlight when redirected
export async function Sidebar() {

  const folders = await getFolders();
  const rootFolders = folders.filter((folder: any) => !folder.parentId);
  const folderTree = rootFolders.map((folder: any) => buildFolderTree(folders, folder));

  return (
    <div className="hidden md:block pb-12 w-72 border-r shrink-0 max-h-screen">
      <div className="flex flex-col h-screen justify-between">
        <SidebarStateManager folderTree={folderTree} />
        {/* //TODO Crear componente seguro con useEffect y convertir en menu para cerrar sesión o configurar */}
        <div className="flex gap-4 items-center justify-start h-16 w-full p-2 ml-2 mb-4">
          {/* <Image src={user?.user_metadata.avatar_url} alt="profile" width={32} height={32} className="rounded-full ml-2" />
          <p>{user?.user_metadata.full_name}</p> */}
          <p>Username will be here</p>
        </div>
      </div>
    </div>
  )
}

