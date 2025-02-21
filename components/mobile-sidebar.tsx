"use client"


import { useState } from "react";
import SidebarContent from "./sidebar-content";
import { SidebarTools } from "./sidebar-tools";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Menu } from "lucide-react";

interface MobileSidebarProps {
    folderTree: any[];
}

export function MobileSidebar({ folderTree }: MobileSidebarProps) {

    const router = useRouter();

    const [activeFolder, setActiveFolder] = useState<string>('');

    const handleFolderClick = (folderId: string) => {
        setActiveFolder(folderId)
        router.push(`/folders/${folderId}`)
    }
    return (
        <div className="flex items-center justify-center lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden fixed left-4 top-4 z-40"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
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
                </SheetContent>
            </Sheet>
        </div>
    )
}