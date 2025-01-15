"use client"

import { notFound } from "next/navigation"
import ContentCard from "@/components/content-card"
import ContentWrapper from "@/components/content-wrapper"
import { useEffect, useState } from "react"
import { useProfile } from "@/components/context/profileContext"

export default function FolderPage({
  params,
}: {
  params: { folderId: string }
}) {
  
  let { profile, loading } = useProfile();
  const [folderContent, setFolderContent] = useState<any>([])

  useEffect(() => {
    if (profile?.content) {
      setFolderContent(profile.content.filter((item: any) => item.folderId === params.folderId));
    }
  }, [profile?.content]);
  
  console.log("/folders/id loaded")


  //TODO: estilos (retornar skeleton)
  if (loading) {
    return <p>Loading...</p>;
  }

  const folder = profile?.folders.find((f: any) => f.id === params.folderId)

  if (!folder) {
    notFound()
  }

  const initialContent = profile?.content.filter((item: any) => item.folderId === params.folderId)

  return (
    <ContentWrapper title={folder.name} initialContent={initialContent} folderContent={folderContent} setFolderContent={setFolderContent}>
      <div className="p-8 w-full">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {(folderContent && folderContent.length > 0) ? folderContent.map((item: any) => (
            <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            contentType={item.type}
            url={item.url}
            tags={item.tags}
            completed={item.completed}
          />
            
          )) : null}
        </div>
      </div>
    </ContentWrapper>
  )
}