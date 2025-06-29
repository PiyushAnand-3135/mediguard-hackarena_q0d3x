"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">🧪 MediGuard</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-lg font-semibold text-blue-600 dark:text-emerald-300">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-white transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-emerald-600 dark:hover:text-white transition">
            About
          </Link>
          <Link href="/scan" className="hover:text-emerald-600 dark:hover:text-white transition">
            Scan
          </Link>
          <Link href="/profile" className="hover:text-emerald-600 dark:hover:text-white transition">
            Profile
          </Link>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
