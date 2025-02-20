import Link from "next/link"
import { Button } from "./ui/button"
import { Wrench } from "lucide-react"
import { usePathname } from "next/navigation"

export const SidebarTools = ({ activeFolder, setActiveFolder }: { activeFolder: string, setActiveFolder: (folderId: string) => void }) => {
    const pathname = usePathname()

    const isActive = pathname === "/tools" || activeFolder === "__tools__";
    
    return (
        <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                Tools
            </h2>
            <div className="space-y-1">
                <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setActiveFolder('__tools__')}
                    asChild
                >
                    <Link href="/tools">
                        <Wrench className="mr-2 h-4 w-4" />
                        All
                    </Link>
                </Button>
            </div>
        </div>
    )
}
