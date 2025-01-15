import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      // Handle youtube.com/watch?v=ID
      const searchParams = new URLSearchParams(urlObj.search)
      const videoId = searchParams.get('v')
      if (videoId) return videoId

      // Handle youtu.be/ID
      const pathSegments = urlObj.pathname.split('/')
      const lastSegment = pathSegments[pathSegments.length - 1]
      if (lastSegment) return lastSegment
    }
    return null
  } catch {
    return null
  }
}

export const getFaviconUrl = (url: string): string => {
  try {
    const { origin } = new URL(url);
    return `${origin}/favicon.ico`;
  } catch {
    throw new Error('Invalid URL');
  }
};

export const getFallbackIcon = (url: string) => {
  try {
      const domain = new URL(url).hostname
      return `https://icon.horse/icon/${domain}`
  } catch {
      return "/placeholder.svg"
  }
}

export function buildFolderTree(folders: any, folder: any): {
  id: string
  name: string
  parentId?: string
  children?: Array<ReturnType<typeof buildFolderTree>>
} {
  const childFolders = folders.filter((f: any) => f.parentId === folder.id)

  if (!folder) return { id: "", name: "Unknown" }

  return {
    id: folder.id,
    name: folder.name,
    ...(childFolders.length > 0//...(folder.children.length > 0
      ? {
        //children: folder.children.map((childFolder: any) =>
        children: childFolders.map((childFolder: any) =>
          buildFolderTree(folders, childFolder)
        ),
      }
      : {}),
  }
}