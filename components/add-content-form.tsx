"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder, Star, X } from 'lucide-react'
import { FolderSelect } from "@/components/folder-select"
import { buildFolderTree } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { useAction } from "@/hooks/useAction"
import { createContent } from "@/lib/server/actions/content/create"
import { toast } from "sonner"

type FormType = {
  title: string,
  url: string,
  contentType: "VIDEO" | "ARTICLE" | "SERIES",
  description: string,
  completed: boolean,
  notes: string,
  rating: number,
}

interface AddContentFormProps {
  folderTree: any[];
  initialFolderId?: string;
}

export function AddContentForm({ folderTree, initialFolderId }: AddContentFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<FormType>({
    title: "",
    url: "",
    contentType: "VIDEO",
    description: "",
    completed: false,
    notes: "",
    rating: 0,
  })
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(initialFolderId)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const { execute } = useAction(createContent, {
    onSuccess: (data) => {
      toast.success("Content added successfully!");
      router.push("/folders/" + (selectedFolder || ""))
    },
    onError: (error) => {
      toast.error("Error creating content");
      console.log(error);
    }
  });

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

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()])
      }
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    execute({ ...formData, tags, folderId: selectedFolder })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-col gap-4 my-4 w-full justify-center content-center">
        <Card>
          <CardContent className="grid gap-8 lg:grid-cols-2 pt-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter a title for your content"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  required
                  value={formData.contentType}
                  onValueChange={(value: "VIDEO" | "ARTICLE" | "SERIES") =>
                    setFormData((prev) => ({ ...prev, contentType: value }))
                  }
                >
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
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Add a description of your content"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type a tag and press Enter"
                />
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label>Parent Folder</Label>
                <Card>
                  <ScrollArea className="h-[200px] p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-2 relative",
                        {
                          "bg-accent": !selectedFolder,
                        }
                      )}
                      onClick={() => setSelectedFolder(undefined)}
                    >
                      <Folder className="h-4 w-4 shrink-0" />
                      Root
                    </Button>
                    <FolderSelect
                      folders={folderTree}
                      selectedFolder={selectedFolder}
                      onSelect={setSelectedFolder}
                      expandedFolders={expandedFolders}
                      onToggleExpand={handleToggleExpand}
                    />
                  </ScrollArea>
                </Card>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Add any personal notes or thoughts"
                  className="min-h-[150px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="completed"
                    checked={formData.completed}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, completed: checked }))
                    }
                  />
                  <Label htmlFor="completed">Mark as completed</Label>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="icon"
                      type="button"
                      className={cn(
                        "hover:bg-transparent",
                        rating <= formData.rating
                          ? "text-yellow-500"
                          : "text-muted-foreground/25"
                      )}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, rating }))
                      }
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>



        <div className="flex gap-4 w-full content-center justify-center">
          <Button type="submit">Create Content</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
} 