"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Moon, Sun } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import ThemeButton from "@/components/theme-button"

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b">
        <div className="flex items-center justify-between px-6 h-16">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <ThemeButton />
        </div>
      </div>
      <main className="flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  )
}

