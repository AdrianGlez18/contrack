import { Header } from "@/components/header"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col">
      {children}
    </div>
  )
}

