"use client"

import { Sparkles, ScanSearch, ShieldCheck } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <ScanSearch className="w-8 h-8 text-primary" />,
      title: "Upload or Scan",
      desc: "Upload a prescription or scan a medicine label using your camera.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "AI Analysis",
      desc: "Our AI engine reviews ingredients, drug interactions, and more.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Get Safe Suggestions",
      desc: "Instant feedback on safety, usage, and safer alternatives.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-gray-900">
      {/* Gradient and blur layers */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-repeat dark:opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent dark:from-gray-800 dark:via-gray-900 pointer-events-none"></div>
      <div className="absolute -top-28 -right-28 w-[28rem] h-[28rem] bg-emerald-200 rounded-full filter blur-3xl opacity-20 dark:bg-teal-700/30 pointer-events-none"></div>
      <div className="absolute -bottom-28 -left-28 w-[28rem] h-[28rem] bg-teal-200 rounded-full filter blur-3xl opacity-20 dark:bg-emerald-700/30 pointer-events-none"></div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 md:px-10 lg:px-16 text-center z-10">
        <h2 className="text-5xl font-extrabold mb-16 text-gray-900 dark:text-white">
          How It <span className="text-primary">Works?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="mb-5">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
