"use client"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Meera Patel",
      comment: "An exceptional tool that simplifies drug safety for my patients. A must-have in healthcare tech.",
    },
    {
      name: "Rohit S.",
      comment: "I used to worry about medicine interactions. Now I just scan and get answers in seconds.",
    },
    {
      name: "Asha Menon",
      comment: "Simple, free, and incredibly helpful. Saved me a trip to the clinic!",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-gray-900">
      {/* Gradient background and blur circles */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-repeat dark:opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent dark:from-gray-800 dark:via-gray-900 pointer-events-none"></div>
      <div className="absolute -top-28 -right-28 w-[28rem] h-[28rem] bg-emerald-200 rounded-full filter blur-3xl opacity-20 dark:bg-teal-700/30 pointer-events-none"></div>
      <div className="absolute -bottom-28 -left-28 w-[28rem] h-[28rem] bg-teal-200 rounded-full filter blur-3xl opacity-20 dark:bg-emerald-700/30 pointer-events-none"></div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 md:px-10 lg:px-16 text-center z-10">
        <h2 className="text-5xl font-extrabold mb-16 text-gray-900 dark:text-white">
          What People <span className="text-primary">Say?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 bg-white dark:bg-gray-800 border border-primary/10 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">“{t.comment}”</p>
              <p className="mt-6 text-base font-semibold text-primary">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
