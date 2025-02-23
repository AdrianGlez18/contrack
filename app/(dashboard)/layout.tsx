import type { Metadata } from "next"
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google'
import { Sidebar } from "@/components/sidebar"
import { ProfileProvider } from "@/components/context/profileContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Content Library",
  description: "Store and organize your favorite content",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
        <Toaster />
      </main>
    </div>
  )
}

