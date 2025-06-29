"use client"

import HeroSection from "@/components/ui/HeroSection"
import FeaturesSection from "@/components/ui/FeaturesSection"
import HowItWorksSection from "@/components/ui/HowItWorksSection"
import TestimonialsSection from "@/components/ui/TestimonialsSection"
import Footer from "@/components/ui/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        {/* Add other sections here later like How it works, testimonials, etc. */}
      </main>

      <Footer />
    </div>
  )
}
