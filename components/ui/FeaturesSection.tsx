"use client"

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Scanning",
      desc: "Detect drug interactions, side effects, and alternatives in seconds using cutting-edge artificial intelligence.",
    },
    {
      title: "Secure & Private",
      desc: "We never store your medical data. Your health information stays with you, 100% private and secure.",
    },
    {
      title: "Completely Free",
      desc: "Access all features at no cost. No hidden charges or subscriptions — just smart healthcare for everyone.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-gray-900">
      {/* Background gradient and circles */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-repeat dark:opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent dark:from-gray-800 dark:via-gray-900 pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-emerald-200 rounded-full filter blur-3xl opacity-20 dark:bg-teal-700/30 pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-teal-200 rounded-full filter blur-3xl opacity-20 dark:bg-emerald-700/30 pointer-events-none"></div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 md:px-10 lg:px-16 text-center z-10">
        <h2 className="text-5xl font-extrabold mb-16 text-gray-900 dark:text-white">
          Why Choose <span className="text-primary">MediGuard?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-700 border border-teal-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
