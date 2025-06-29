"use client"

import { useState } from "react"
import { X, MessageCircle } from "lucide-react"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
            hover:w-auto w-14 h-14 overflow-hidden"
        >
          <div className="flex items-center justify-center w-8 h-8">
            <MessageCircle className="h-5 w-5" />
          </div>
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
            Need Help?
          </span>
        </button>
      </div>

      {/* Chat Popup Modal with Embedded Iframe */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-4xl sm:max-w-5xl bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col h-[95%] sm:h-[90%]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white z-10">
              <h2 className="text-lg font-semibold text-emerald-600">Salty - MediGuard Assistant</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            </div>

            {/* Chat Iframe */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="https://courageous-marigold-ef86c9.netlify.app/"
                title="MediGuard Assistant"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
