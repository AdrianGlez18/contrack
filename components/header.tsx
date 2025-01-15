"use client"

//TODO Mobile Header and sidebar

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import ThemeButton from "./theme-button"
import Link from "next/link"
import { useProfile } from "./context/profileContext"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

//TODO Change tags component to filtered one

export function Header({ title = "", initialContent = [], folderContent = [], setFolderContent }:
  {
    title: string,
    initialContent: any[],
    folderContent: any[],
    setFolderContent: React.Dispatch<React.SetStateAction<any[]>>
  }) {
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showCompleted, setShowCompleted] = useState<"all" | "completed" | "pending">("all")
  const [selectedContentType, setSelectedContentType] = useState<"ALL" | "VIDEO" | "ARTICLE" | "SERIES">("ALL")

  const { profile, loading } = useProfile();

  const tagFilter = profile?.content.flatMap((item: any) => item.tags)
  const uniqueTags: string[] = Array.from(new Set(tagFilter))

  useEffect(() => {
    console.log("/Header laoded")
    setFolderContent(
      [...initialContent].filter((item: any) => {
        return (
          (item.title.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase())) &&
          (selectedContentType === "ALL" || item.type === selectedContentType) &&
          (showCompleted === "all" || item.completed === (showCompleted === "completed")) &&
          (selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag)))
        )
      })
    )
  }, [search, selectedTags, showCompleted, selectedContentType])

  return (
    <header className="flex flex-col gap-2 my-2">
      <div className="flex justify-between items-center mb-8 px-8 pt-8 w-full">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Link href="/folders/add-content" passHref>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Content
          </Button>
        </Link>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add content</DialogTitle>
              <DialogDescription>
                Add a new piece of content to your library
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" type="url" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIDEO">Video</SelectItem>
                    <SelectItem value="ARTICLE">Article</SelectItem>
                    <SelectItem value="SERIES">Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="folder">Folder</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Separate tags with commas" />
              </div>
            </div>
          </DialogContent>
        </Dialog> */}
      </div>
      <div className="flex items-center gap-4 px-8 h-16">
        <div className="flex-1 flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search content..."
            className="max-w-xs"
            onChange={(e) => setSearch(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                Tags
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueTags.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item}
                  checked={selectedTags.includes(item)}
                  onCheckedChange={(checked) => {
                    setSelectedTags(prev =>
                      checked
                        ? [...prev, item]
                        : prev.filter(t => t !== item)
                    )
                  }}
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showCompleted === "all"}
                onCheckedChange={() => setShowCompleted("all")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showCompleted === "completed"}
                onCheckedChange={() => setShowCompleted("completed")}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showCompleted === "pending"}
                onCheckedChange={() => setShowCompleted("pending")}
              >
                Pending
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                Content Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by content type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedContentType === "ALL"}
                onCheckedChange={() => setSelectedContentType("ALL")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedContentType === "VIDEO"}
                onCheckedChange={() => setSelectedContentType("VIDEO")}
              >
                Video
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedContentType === "ARTICLE"}
                onCheckedChange={() => setSelectedContentType("ARTICLE")}
              >
                Article
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedContentType === "SERIES"}
                onCheckedChange={() => setSelectedContentType("SERIES")}
              >
                Series
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <ThemeButton />
      </div>
      {selectedTags.length > 0 && (
        <div className="w-full px-8 mx-2">
          <ScrollArea className="w-96  rounded-md ">
            <div className="flex gap-2  mb-3 py-1">
              {selectedTags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                >
                  {tag}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </header>
  )
}

