"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from "react"
import Image from "next/image"
import { useAction } from "@/hooks/useAction"
import { createTool } from "@/lib/server/actions/tool/create"
import { deleteTool } from "@/lib/server/actions/tool/delete"

interface ToolsWrapperProps {
    title: string
    initialTools: any[]
}

export const ToolsWrapper = ({ title, initialTools }: ToolsWrapperProps) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteMode, setIsDeleteMode] = useState(false)
    const [toolToDelete, setToolToDelete] = useState<string | null>(null)
    const [newTool, setNewTool] = useState({
        title: "",
        iconUrl: "auto",
        url: "",
    })

    const [failedIcons, setFailedIcons] = useState<Set<string>>(new Set())
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState<"alphabetical" | "date">("alphabetical")

    const { execute: executeCreate, fieldErrors: createFieldErrors } = useAction(createTool, {
        onSuccess: (data) => {
            toast.success('Tool created successfully!');
        },
        onError: () => {
            toast.error("Error creating tool");
        }
    });

    const { execute: executeDelete, fieldErrors: deleteFieldErrors } = useAction(deleteTool, {
        onSuccess: (data) => {
            toast.success('Tool deleted successfully!');
        },
        onError: () => {
            toast.error("Error deleting tool");
        }
    });

    const handleAddTool = () => {
        executeCreate(newTool)
        setIsDialogOpen(false)
        setTimeout(() => {
            setNewTool({ title: "", iconUrl: "auto", url: "" })
        }, 150)
    }

    const handleDeleteTool = () => {
        if (toolToDelete) {
            executeDelete({ id: toolToDelete })
            setToolToDelete(null)
        }
    }

    const handleIconError = (toolId: string) => {
        setFailedIcons(prev => new Set(prev).add(toolId))
    }

    return (
        <div className="flex-1 flex flex-col w-full">
            <div className="p-8 w-full">
                {/* Desktop */}
                <div className="hidden lg:flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Tools</h1>
                    <div className="flex gap-2">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4" />
                                    <span className="ml-2 hidden md:block">Add Tool</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add tool</DialogTitle>
                                    <DialogDescription>
                                        Add a new tool to your quick access menu
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={newTool.title}
                                            onChange={(e) =>
                                                setNewTool((prev) => ({ ...prev, title: e.target.value }))
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="url">URL</Label>
                                        <Input
                                            id="url"
                                            type="url"
                                            value={newTool.url}
                                            onChange={(e) =>
                                                setNewTool((prev) => ({ ...prev, url: e.target.value }))
                                            }
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={handleAddTool}
                                        disabled={!newTool.title || !newTool.url}
                                    >
                                        Add Tool
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant={isDeleteMode ? "destructive" : "outline"}
                            onClick={() => setIsDeleteMode(!isDeleteMode)}
                        >
                            <Trash2 className="h-4 w-4" />
                            {isDeleteMode ?
                                <span className="ml-2 hidden md:block">Done</span> :
                                <span className="ml-2 hidden md:block">Remove Tools</span>
                            }
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:flex gap-4 mb-6">
                    <Input
                        placeholder="Search tools..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs"
                    />
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as "alphabetical" | "date")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="alphabetical">Alphabetical</SelectItem>
                            <SelectItem value="date">Creation Date</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Mobile */}
                <div className="flex lg:hidden gap-4 mb-6 justify-between items-center w-full">
                    <Input
                        placeholder="Search tools..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-md"
                    />
                    
                </div>
                <div className="flex items-center justify-around lg:hidden">
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as "alphabetical" | "date")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="alphabetical">Alphabetical</SelectItem>
                            <SelectItem value="date">Creation Date</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4" />
                                    <span className="ml-2 hidden md:block">Add Tool</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add tool</DialogTitle>
                                    <DialogDescription>
                                        Add a new tool to your quick access menu
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={newTool.title}
                                            onChange={(e) =>
                                                setNewTool((prev) => ({ ...prev, title: e.target.value }))
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="url">URL</Label>
                                        <Input
                                            id="url"
                                            type="url"
                                            value={newTool.url}
                                            onChange={(e) =>
                                                setNewTool((prev) => ({ ...prev, url: e.target.value }))
                                            }
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={handleAddTool}
                                        disabled={!newTool.title || !newTool.url}
                                    >
                                        Add Tool
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant={isDeleteMode ? "destructive" : "outline"}
                            onClick={() => setIsDeleteMode(!isDeleteMode)}
                        >
                            <Trash2 className="h-4 w-4" />
                            {isDeleteMode ?
                                <span className="ml-2 hidden md:block">Done</span> :
                                <span className="ml-2 hidden md:block">Remove Tools</span>
                            }
                        </Button>
                    </div>
                </div>
                {/* Tools */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12 gap-4 overflow-auto">
                    {initialTools
                        .filter((item: any) =>
                            item.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .sort((a: any, b: any) => {
                            if (sortBy === "alphabetical") {
                                return a.title.localeCompare(b.title)
                            }
                            return 0
                        })
                        .map((item: any) => (
                            <div key={item.id} className="relative group my-3">
                                {isDeleteMode && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -right-2 -top-2 z-10 h-6 w-6"
                                        onClick={() => setToolToDelete(item.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                                <a
                                    href={isDeleteMode ? undefined : item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-col items-center gap-3 p-4 rounded-lg border bg-card transition-colors group 
                                ${isDeleteMode
                                            ? 'cursor-default hover:bg-destructive/10'
                                            : 'hover:bg-accent'
                                        }`}
                                >
                                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-background group-hover:border-primary/50 transition-colors">
                                        <Image
                                            src={failedIcons.has(item.id) ? '/favicon.ico' /* getFallbackIcon(item.url) */ : item.iconUrl} //todo default icon ?
                                            alt={`${item.title} icon`}
                                            fill
                                            className="object-contain p-2"
                                            onError={() => handleIconError(item.id)}
                                            unoptimized
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-center line-clamp-2">
                                        {item.title}
                                    </span>
                                </a>
                            </div>
                        ))}
                </div>

                <AlertDialog open={!!toolToDelete} onOpenChange={() => setToolToDelete(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete this tool from your collection.
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteTool}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}
