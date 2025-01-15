"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import { getYouTubeId } from "@/lib/utils"
import { YouTubeEmbed } from '@next/third-parties/google'
import { useProfile } from "@/components/context/profileContext"

type contentType = {
  id: string,
  title: string,
  description: string,
  url: string,
  completed: boolean,
  type: "VIDEO" | "ARTICLE" | "SERIES",
  tags: string[]
}

const contentTemplate: contentType = {
  id: "",
  title: "",
  description: "",
  url: "",
  completed: false,
  type: "VIDEO",
  tags: []
}

export default function ContentPage({
  params,
}: {
  params: { contentId: string }
}) {

  let { profile, loading } = useProfile();
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<contentType>(contentTemplate)
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    if (profile?.content) {
      setFormData(profile.content.find((item: any) => item.id === params.contentId))
    }
  }, [profile?.content, params.contentId])

  //TODO: estilos (retornar skeleton)
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!formData) {
    return <div className="p-8">Content not found</div>
  } 
  
  const youtubeId = formData.type === "VIDEO" ? getYouTubeId(formData.url) : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO Update endpoint
    console.log("Updating content:", formData)
    setIsEditing(false)
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag) {
      e.preventDefault()
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }))
      }
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Content Details</h1>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {formData.type === "VIDEO" && youtubeId && (
        <div className="mb-8 aspect-video">
          <YouTubeEmbed
            videoid={youtubeId}
            height={400}
          />
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={value => setFormData(prev => ({ ...prev, type: value as any }))}
            >
              <SelectTrigger>
                <SelectValue />
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
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={addTag}
              placeholder="Type a tag and press Enter"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.completed}
              onCheckedChange={checked => setFormData(prev => ({ ...prev, completed: checked }))}
            />
            <Label>Completed</Label>
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-1">
            <Label>Title</Label>
            <p className="text-lg">{formData.title}</p>
          </div>

          <div className="grid gap-1">
            <Label>URL</Label>
            <a
              href={formData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {formData.url}
            </a>
          </div>

          <div className="grid gap-1">
            <Label>Type</Label>
            <p>{formData.type}</p>
          </div>

          <div className="grid gap-1">
            <Label>Description</Label>
            <p className="text-muted-foreground">{formData.description}</p>
          </div>

          <div className="grid gap-1">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.completed}
              disabled
            />
            <Label>Completed</Label>
          </div>
        </div>
      )}
    </div>
  )
}

