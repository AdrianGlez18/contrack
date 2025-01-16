"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Chrome, Folder, Library, Tags, Video } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="border-b w-full flex items-center justify-center">
        <div className="container flex items-center justify-between h-16 mx-4 px-4">
          <div className="flex items-center gap-2 font-semibold">
            <Library className="h-6 w-6 mr-2" />
            <span>Contrack</span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-col w-full items-center justify-center">
        {/* Hero Section */}
        <section className="container py-24 space-y-8 md:py-32">
          <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Your personal content library,{" "}
              <span className="text-primary">organized</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Save and organize your favorite videos, articles, and series in one place. 
              Access them anywhere, anytime.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild disabled={true} className="disabled">
                {/* <a href="#" target="_blank" rel="noopener noreferrer"> */}
                  <div>
                  <Chrome className="mr-2 h-4 w-4" />
                  Chrome Extension (soon)
                  </div>
                {/* </a> */}
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 space-y-8 md:py-32">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
              <div className="flex items-center gap-4">
                <div className="rounded-full border p-2 group-hover:border-primary/50 transition-colors">
                  <Folder className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Nested Playlists</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Create unlimited nested playlists to organize your content just the way you want. Perfect for complex topics and projects.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards delay-200">
              <div className="flex items-center gap-4">
                <div className="rounded-full border p-2 group-hover:border-primary/50 transition-colors">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Video Integration</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Watch YouTube videos directly in the app. Keep track of what you've watched and organize them into playlists.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards delay-300">
              <div className="flex items-center gap-4">
                <div className="rounded-full border p-2 group-hover:border-primary/50 transition-colors">
                  <Tags className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Smart Tagging</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Add tags to your content for easy filtering and discovery. Find exactly what you need, when you need it.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <div className="container py-24 md:py-32">
            <div className="flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground">
                Join thousands of users organizing their digital content.
              </p>
              <Button size="lg" className="mt-4" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Library className="h-6 w-6" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built with love by{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                your name
              </a>
              . The source code is available on{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

