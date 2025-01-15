"use client"

import { Content } from '@prisma/client'
import { Header } from './header'

const ContentWrapper = ({ children, title, initialContent, folderContent, setFolderContent }: {
    children: React.ReactNode,
    title: string,
    initialContent: any[],
    folderContent: any[],
    setFolderContent: React.Dispatch<React.SetStateAction<any[]>>
}) => {
    return (
        <>
            <Header title={title} initialContent={initialContent} folderContent={folderContent} setFolderContent={setFolderContent} />
            <main className="flex-1 overflow-auto bg-background">
                {children}
            </main>
        </>
    )
}

export default ContentWrapper 