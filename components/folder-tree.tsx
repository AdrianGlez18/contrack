"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Folder } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FolderNode {
  id: string
  name: string
  parentId?: string
  children?: FolderNode[]
}

interface FolderTreeProps {
  folders: FolderNode[]
  level?: number
  activeFolder?: string
  onFolderClick: (folderId: string) => void
  expandedFolders: Set<string>
  onToggleExpand: (folderId: string) => void
}

export function FolderTree({
  folders,
  level = 0,
  activeFolder,
  onFolderClick,
  expandedFolders,
  onToggleExpand,
}: FolderTreeProps) {
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
                "bg-accent": activeFolder === folder.id,
              },
              level > 0 && "pl-8"
            )}
            onClick={(e) => {
              e.preventDefault()
              if (folder.children?.length) {
                onToggleExpand(folder.id)
              }
              onFolderClick(folder.id)
            }}
            asChild
          >
            <Link href={`/folders/${folder.name}`}>
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
            </Link>
          </Button>
          {folder.children?.length && expandedFolders.has(folder.id) && (
            <div className="pl-4">
              <FolderTree
                folders={folder.children}
                level={level + 1}
                activeFolder={activeFolder}
                onFolderClick={onFolderClick}
                expandedFolders={expandedFolders}
                onToggleExpand={onToggleExpand}
              />
            </div>
          )}
        </div>
      ))}
    </>
  )
}

