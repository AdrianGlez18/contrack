"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Folder, Plus } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@/lib/utils'
import { FolderSelect } from './folder-select'
import { FolderTree } from './folder-tree'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAction } from '@/hooks/useAction'
import { createFolder } from '@/lib/server/actions/folder/create'
import { toast } from 'sonner'

interface SidebarContentProps {
    folderTree: any[]
    activeFolder: string
    setActiveFolder: (folder: string) => void
    handleFolderClick: (folderId: string) => void
}

const SidebarContent = ({
    folderTree,
    activeFolder,
    setActiveFolder,
    handleFolderClick
}: SidebarContentProps) => {
    const pathname = usePathname();

    //TODO: expandedFolders persist as localstorage
    const [selectedParentFolder, setSelectedParentFolder] = useState<string>();
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [createDialogExpandedFolders, setCreateDialogExpandedFolders] = useState<Set<string>>(new Set())

    const [newFolderName, setNewFolderName] = useState("")

    const { execute: executeCreate } = useAction(createFolder, {
        onSuccess: (data) => {
            toast.success('Folder created successfully!');
        },
        onError: () => {
            toast.error("Error creating tool");
        }
    });

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
    };

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

    return (
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
                                "bg-accent": activeFolder === '__folders__' || pathname === '/folders',
                            },
                        )}
                        onClick={(e) => {
                            setActiveFolder('__folders__');
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
    )
}

export default SidebarContent