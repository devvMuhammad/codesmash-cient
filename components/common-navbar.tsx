"use client"

import Link from "next/link"
import { Code } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { UserDropdown } from "@/components/user-dropdown"

export function CommonNavbar() {
  return (
    <nav className="border-b border-border/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CodeDuel</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/lobby" className="text-foreground hover:text-primary transition-colors">
              Lobby
            </Link>
            <Link href="/leaderboard" className="text-foreground hover:text-primary transition-colors">
              Leaderboard
            </Link>
            <Link href="/practice" className="text-foreground hover:text-primary transition-colors">
              Practice
            </Link>
            <ThemeSwitcher />
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
