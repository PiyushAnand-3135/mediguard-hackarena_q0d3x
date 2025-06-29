"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#0b1f26] dark:via-[#0e2c31] dark:to-[#101c1f]">
      {/* Background blur and gradients */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-repeat dark:opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent dark:from-transparent dark:via-transparent"></div>
      <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-[#16baa5]/30 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-[#16baa5]/20 rounded-full filter blur-3xl opacity-30"></div>

      {/* Main hero content */}
      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10 text-gray-800 dark:text-white">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-20 min-h-[calc(100vh-5rem)] text-center lg:text-left">

          {/* Text block */}
          <div className="w-full max-w-2xl space-y-8">
            <div className="inline-flex items-center rounded-full border bg-white/50 backdrop-blur-sm px-3 py-1 text-sm mx-auto lg:mx-0 dark:bg-white/10 dark:border-white/10">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
              <span className="text-emerald-700 dark:text-primary">Your medication safety assistant</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="block text-black-600 dark:text-white">Quality Medicines</span>
              <span className="block text-primary">For All !</span>
            </h1>

            <p className="text-gray-600 md:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0 dark:text-gray-300">
              Scan your medicine labels or prescriptions to check drug interactions, side effects, and find alternatives with our AI-powered health assistant.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/scan">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#16baa5] to-[#11998e] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 dark:from-[#16baa5] dark:to-[#0f766e]"
                >
                  Scan Medicine <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-gray-400 text-gray-800 dark:border-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-full transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 justify-center lg:justify-start dark:text-gray-400">
              <div className="flex -space-x-2">
                {[2, 0, 0, 0].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-s font-medium text-emerald-700 dark:bg-gray-700 dark:text-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Trusted by thousands of users</span>
            </div>
          </div>

          {/* Image block */}
          <div className="w-full max-w-lg flex justify-end">
            <div className="relative z-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-emerald-100 dark:border-gray-700 p-2">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/mediguard_logo.jpg"
                  alt="MediGuard App Demo"
                  width={500}
                  height={700}
                  className="object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
