"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Folder, Plus, Wrench } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FolderTree } from "./folder-tree"
import { buildFolderTree } from "@/lib/utils"
import { FolderSelect } from "./folder-select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAction } from "@/hooks/useAction"
import { createFolder } from "@/lib/server/actions/folder/create"
import { toast } from "sonner"
import { useProfile } from "./context/profileContext"
import path from "path"
import { set } from "zod"

//todo fix active section highlight when redirected
export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  let { profile, loading } = useProfile();

  const [activeFolder, setActiveFolder] = useState<string>('')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [selectedParentFolder, setSelectedParentFolder] = useState<string>()
  const [createDialogExpandedFolders, setCreateDialogExpandedFolders] = useState<Set<string>>(new Set())
  const [folders, setFolders] = useState<any>([])
  const [rootFolders, setRootFolders] = useState<any>([])
  const [folderTree, setFolderTree] = useState<any>([])
  //const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log("setting folders")
    if (profile?.folders) {
      console.log("inside if setting folders")
      /* setFolders(profile.folders);
      console.log("profile.folders", profile.folders)
      console.log("folders", folders) */
      /* setFolders(() => {
        console.log("profile.folders", profile.folders);
        return profile.folders; // Actualización de estado
    }); */
      setRootFolders(profile.folders.filter((folder: any) => !folder.parentId));
      setFolderTree(rootFolders.map((folder: any) => buildFolderTree(profile.folders, folder)));
      setFolders(profile.folders);
    }
  }, [profile?.folders]);

  /* useEffect(() => {
    console.log("setting root folders and tree")
    setRootFolders(folders.filter((folder: any) => !folder.parentId));
    setFolderTree(rootFolders.map((folder: any) => buildFolderTree(folders, folder)));
  }, [folders]); */

  useEffect(() => {
    //if folders array is not empty
    if (folders.length > 0) {
      console.log("setting root folders and tree")
      setRootFolders(folders.filter((folder: any) => !folder.parentId));
      setFolderTree(rootFolders.map((folder: any) => buildFolderTree(folders, folder)));
    }
  }, [folders]);

  const { execute: executeCreate, fieldErrors: createFieldErrors } = useAction(createFolder, {
    onSuccess: (data) => {
      toast.success('Folder created successfully!');
      setFolders([...folders, data])
      console.log(data)
      /* aux.push(data)
      setTools(aux) */
    },
    onError: () => {
      toast.error("Error creating tool");
    }
  });

  console.log("/Sidebar loaded")

  const handleFolderClick = (folderId: string) => {
    setActiveFolder(folderId)
    router.push(`/folders/${folderId}`)
  }

  //TODO: estilos (retornar skeleton)
  if (loading) {
    return <p>Loading...</p>;
  }

  //const initialFolders = profile?.folders
  //const rootFolders = initialFolders.filter((folder: any) => !folder.parentId)
  //const folderTree = rootFolders.map((folder: any) => buildFolderTree(initialFolders, folder))



  const handleToggleExpand = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  const handleCreateDialogToggleExpand = (folderId: string) => {
    setCreateDialogExpandedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  const handleCreateFolder = () => {

    console.log("Creating folder:", {
      name: newFolderName,
      parentId: selectedParentFolder,
    })

    const newFolder = { name: newFolderName, parentId: selectedParentFolder };
    executeCreate(newFolder);

    setIsCreateDialogOpen(false)
    setNewFolderName("")
    setSelectedParentFolder(undefined)

  }

  return (
    <div className="hidden md:block pb-12 w-72 border-r shrink-0 max-h-screen">
      <div className="flex flex-col h-screen justify-between">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Tools
            </h2>
            <div className="space-y-1">
              <Button
                variant={pathname === "/tools" ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveFolder('')}
                asChild
              >
                <Link href="/tools">
                  <Wrench className="mr-2 h-4 w-4" />
                  All
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <h2 className="px-2 text-lg font-semibold tracking-tight">
                Content
              </h2>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create folder</DialogTitle>
                    <DialogDescription>
                      Add a new folder to organize your content
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Enter folder name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Parent Folder</Label>
                      <div className="border rounded-lg">
                        <ScrollArea className="h-[300px] p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start gap-2 relative",
                              {
                                "bg-accent": !selectedParentFolder,
                              }
                            )}
                            onClick={() => setSelectedParentFolder(undefined)}
                          >
                            <Folder className="h-4 w-4 shrink-0" />
                            Root
                          </Button>
                          <FolderSelect
                            folders={folderTree}
                            selectedFolder={selectedParentFolder}
                            onSelect={setSelectedParentFolder}
                            expandedFolders={createDialogExpandedFolders}
                            onToggleExpand={handleCreateDialogToggleExpand}
                          />
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleCreateFolder}
                      disabled={!newFolderName}
                    >
                      Create Folder
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>


            <ScrollArea>
              <div className="space-y-1 mt-2  flex flex-col max-h-[50vh] 2xl:max-h-[60vh]">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-2 relative",
                    {
                      "bg-accent": activeFolder === '//folders' || pathname === '/folders',
                    },
                  )}
                  onClick={(e) => {
                    setActiveFolder('//folders')
                  }}
                  asChild
                >
                  <Link href={`/folders`}>

                    <Folder className="h-4 w-4 shrink-0" />
                    All
                  </Link>
                </Button>
                <FolderTree
                  folders={folderTree}
                  activeFolder={activeFolder}
                  onFolderClick={handleFolderClick}
                  expandedFolders={expandedFolders}
                  onToggleExpand={handleToggleExpand}
                />
              </div>
            </ScrollArea>



          </div>
        </div>
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

