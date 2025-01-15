"use client"

import ContentCard from "@/components/content-card"
import ContentWrapper from "@/components/content-wrapper"
import { useEffect, useState } from "react"
import { useProfile } from "@/components/context/profileContext"

export default function Home() {

  const [folderContent, setFolderContent] = useState<any>([])
  let { profile, loading } = useProfile();

  useEffect(() => {
    if (profile?.content) {
      setFolderContent(profile.content);
    }
  }, [profile?.content]);

  //TODO: estilos (retornar skeleton)
  if (loading) {
    return <p>Loading...</p>;
  }

  
  return (
    <ContentWrapper title="Your Content" initialContent={profile?.content} folderContent={folderContent} setFolderContent={setFolderContent}>
      <div className="p-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {folderContent.map((item: any) => (
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
          ))}
        </div>
      </div>
    </ContentWrapper>
  )
}

