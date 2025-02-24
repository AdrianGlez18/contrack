"use client"

import { Content } from '@prisma/client'
import { Header } from './content-header'
import { useState } from 'react'
import ContentCard from './content-card'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 15;

const ContentWrapper = ({ title, initialContent }: {
    title: string,
    initialContent: any[],
}) => {
    const [folderContent, setFolderContent] = useState<any[]>(initialContent);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(folderContent.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentContent = folderContent.slice(startIndex, endIndex);

    return (
        <>
            <Header title={title} initialContent={initialContent} folderContent={folderContent} setFolderContent={setFolderContent} />
            <main className="flex-1 overflow-auto bg-background">
                <div className="p-4">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {currentContent.map((item: any) => (
                            <div className="flex items-center justify-center">
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
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-2 py-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="text-sm">
                                Page {currentPage} of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default ContentWrapper 