"use client"

import { Video, Newspaper, PlaySquare, Check, ExternalLink, FileEdit } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import Link from "next/link"
import Image from "next/image"
import { getYouTubeId } from "@/lib/utils"

function getVideoThumbnail(url: string): string | null {
  const videoId = getYouTubeId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
}

interface ContentCardProps {
  id: string,
  title: string,
  description: string,
  contentType: string,
  url: string,
  tags: string[],
  completed: boolean
}

const ContentCard = ({ id, title, description, contentType, url, tags, completed }: ContentCardProps) => {
  return (
    <Card key={id}>
      {contentType === "VIDEO" && getVideoThumbnail(url) && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={getVideoThumbnail(url)!}
            alt={`Video thumbnail for ${title}`}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2">
          {contentType === "VIDEO" && <Video className="h-5 w-5 text-primary" />}
          {contentType === "ARTICLE" && <Newspaper className="h-5 w-5 text-primary" />}
          {contentType === "SERIES" && <PlaySquare className="h-5 w-5 text-primary" />}
          <CardTitle className="flex-1 leading-6">{title}</CardTitle>
          {completed && (
            <Check className="h-5 w-5 text-green-500 mx-1" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" asChild>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/content/${id}`}>
            <FileEdit className="h-4 w-4 mr-2" />
            Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ContentCard