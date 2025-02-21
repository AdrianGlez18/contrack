"use client"

import { useState } from "react";
import SidebarContent from "./sidebar-content";
import { SidebarTools } from "./sidebar-tools";
import { useRouter } from "next/navigation";
interface SidebarStateManagerProps {
    folderTree: any[];
}

export function SidebarStateManager({ folderTree }: SidebarStateManagerProps) {

    const router = useRouter();

    const [activeFolder, setActiveFolder] = useState<string>('');

    const handleFolderClick = (folderId: string) => {
        setActiveFolder(folderId)
        router.push(`/folders/${folderId}`)
      }

    return (
        <div className="space-y-4 py-4">
            <SidebarTools 
            activeFolder={activeFolder} 
            setActiveFolder={setActiveFolder} />
            <SidebarContent 
            folderTree={folderTree}
            activeFolder={activeFolder}
            setActiveFolder={setActiveFolder}
            handleFolderClick={handleFolderClick}
            />
        </div>
    )
}
