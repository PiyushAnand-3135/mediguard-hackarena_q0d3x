"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} MediGuard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
