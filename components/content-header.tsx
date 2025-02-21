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
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Checkbox } from "./ui/checkbox"

//TODO Change tags component to filtered one
//Todo sort content
//todo pagination (12 per page)

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

  console.log(folderContent)
  const tagFilter = folderContent.flatMap((item: any) => item.tags)
  console.log(tagFilter)
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
    <header className="flex flex-col gap-2 my-2 w-full">
      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center mb-8 px-4 lg:px-8 pt-8 w-full">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Link href="/folders/add-content" passHref>
          <Button className="flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden lg:block">Add Content</span>
          </Button>
        </Link>
      </div>
      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-4 px-8 h-16">
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
              <Command>
                <CommandInput placeholder="Search tags..." />
                <CommandList>
                  <CommandEmpty>No tags found.</CommandEmpty>
                  <CommandGroup>
                    {uniqueTags.map((item) => (
                      <CommandItem
                        key={item}
                        onSelect={() => {
                          setSelectedTags(prev =>
                            prev.includes(item)
                              ? prev.filter(t => t !== item)
                              : [...prev, item]
                          )
                        }}
                      >
                        <Checkbox
                          checked={selectedTags.includes(item)}
                          className="mr-2"
                        />
                        {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
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
      {/* Mobile Filters */}
      <div className="flex lg:hidden items-center gap-4 px-8 h-16">
        <Input
          type="search"
          placeholder="Search content..."
          className="max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href="/folders/add-content" passHref>
          <Button className="flex items-center justify-center">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:block">Add Content</span>
          </Button>
        </Link>
        {/* todo remove content */}
      </div>
      <div className="flex lg:hidden items-center mx-auto gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10">
              Tags
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {uniqueTags.map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => {
                        setSelectedTags(prev =>
                          prev.includes(item)
                            ? prev.filter(t => t !== item)
                            : [...prev, item]
                        )
                      }}
                    >
                      <Checkbox
                        checked={selectedTags.includes(item)}
                        className="mr-2"
                      />
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
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
      {selectedTags.length > 0 && (
        <div className="w-full px-8 mx-2 hidden lg:block">
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

