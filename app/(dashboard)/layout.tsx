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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ProfileProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        {children}
        <Toaster />
      </div>
    </ProfileProvider>

  )
}

