"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Folder } from 'lucide-react'
import { cn } from "@/lib/utils"

interface FolderNode {
  id: string
  name: string
  children?: FolderNode[]
}

interface FolderSelectProps {
  folders: FolderNode[]
  selectedFolder?: string
  onSelect: (folderId: string) => void
  level?: number
  expandedFolders: Set<string>
  onToggleExpand: (folderId: string) => void
}

export function FolderSelect({
  folders,
  selectedFolder,
  onSelect,
  level = 0,
  expandedFolders,
  onToggleExpand,
}: FolderSelectProps) {
  return (
    <>
      {folders.map((folder) => (
        <div key={folder.id}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start gap-2 relative",
              {
                "bg-accent": selectedFolder === folder.id,
              },
              level > 0 && "ml-4"
            )}
            onClick={(e) => {
              e.preventDefault()
              onSelect(folder.id)
              if (folder.children?.length) {
                onToggleExpand(folder.id)
              }
            }}
          >
            {folder.children?.length ? (
              <ChevronRight
                className={cn("h-4 w-4 shrink-0 transition-transform", {
                  "transform rotate-90": expandedFolders.has(folder.id),
                })}
              />
            ) : (
              <span className="w-4" />
            )}
            <Folder className="h-4 w-4 shrink-0" />
            {folder.name}
          </Button>
          {folder.children?.length && expandedFolders.has(folder.id) && (
            <FolderSelect
              folders={folder.children}
              selectedFolder={selectedFolder}
              onSelect={onSelect}
              level={level + 1}
              expandedFolders={expandedFolders}
              onToggleExpand={onToggleExpand}
            />
          )}
        </div>
      ))}
    </>
  )
}

