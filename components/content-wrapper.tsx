"use client"

import { Content } from '@prisma/client'
import { Header } from './content-header'
import { useState } from 'react'
import ContentCard from './content-card'

//TODO: Si no hay ninguna, crear un placeholder con un botón para crear una
const ContentWrapper = ({ title, initialContent }: {
    title: string,
    initialContent: any[],
}) => {
    const [folderContent, setFolderContent] = useState<any[]>(initialContent);
    return (
        <>
            <Header title={title} initialContent={initialContent} folderContent={folderContent} setFolderContent={setFolderContent} />
            <main className="flex-1 overflow-auto bg-background">
                <div className="p-4">
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
            </main>
        </>
    )
}

export default ContentWrapper 