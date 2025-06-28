"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Pill, Search, Shield, Zap, Sparkles, User } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-emerald-500" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              MediGuard
            </span>
          </Link>
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link href="/scan" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Scan Medicine
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              About
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="text-sm font-medium hover:text-emerald-600 transition-colors flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Button variant="outline" size="sm" onClick={logout} className="text-sm bg-transparent">
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      {/* Rest of the component remains exactly the same */}
      <main className="flex-1">
        <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-repeat"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-20"></div>

          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border bg-white/50 backdrop-blur-sm px-3 py-1 text-sm">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
                  <span className="text-emerald-700">Your medication safety assistant</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    <span className="block">Quality Medicines</span>
                    <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                      For All !
                    </span>
                  </h1>
                  <p className="max-w-[600px] mx-auto lg:mx-0 text-gray-600 md:text-xl">
                    Scan your medicine labels or prescriptions to check drug interactions, side effects, and find
                    alternatives with our AI-powered health assistant.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="/scan">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                    >
                      Scan Medicine
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-emerald-200 hover:bg-emerald-50 transition-colors bg-transparent"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-xs font-medium text-emerald-700"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span>Trusted by thousands of users</span>
                </div>
              </div>

              <div className="flex-1 relative mt-8 lg:mt-0 w-full max-w-md mx-auto">
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-emerald-500/10 border border-emerald-100 p-2 max-w-md mx-auto">
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src="mediguard_logo.jpg"
                      alt="MediGuard App Demo"
                      width={400}
                      height={600}
                      className="object-cover w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute top-8 -right-4 sm:-right-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl h-16 w-16 sm:h-24 sm:w-24 flex items-center justify-center text-white font-bold shadow-lg transform rotate-12">
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 relative">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">How MediGuard Protects You</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Our AI-powered platform provides comprehensive medication information to keep you safe and informed.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-emerald-50">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 rounded-full -mt-10 -mr-10"></div>
                <CardHeader className="pb-2 relative">
                  <div className="bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Search className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Scan & Extract</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Upload an image of your medicine label or prescription. Our AI-powered OCR technology extracts the
                    medication details with precision.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-emerald-50">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 rounded-full -mt-10 -mr-10"></div>
                <CardHeader className="pb-2 relative">
                  <div className="bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Zap className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Check Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Identify potential drug interactions and side effects based on the medication's composition to
                    prevent adverse reactions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-emerald-50 md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 rounded-full -mt-10 -mr-10"></div>
                <CardHeader className="pb-2 relative">
                  <div className="bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Pill className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Find Alternatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Discover generic and branded alternatives to your medication, potentially saving you money while
                    maintaining efficacy.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to verify your medications?</h2>
              <p className="text-emerald-50 mb-6 sm:mb-8 text-base sm:text-lg">
                Join thousands of users who trust MediGuard to keep them safe and informed about their medications.
              </p>
              <Link href="/scan">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Users Love MediGuard</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                See what our community has to say about their experience with our platform.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white border border-emerald-100">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="font-medium text-emerald-600">U{i}</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">User {i}</CardTitle>
                        <CardDescription>Verified User</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600">
                      "MediGuard has been a lifesaver for me. I can quickly check my medications and find affordable
                      alternatives. The interface is intuitive and the information is comprehensive."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 md:py-12 bg-gradient-to-b from-white to-emerald-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Shield className="h-6 w-6 text-emerald-500" />
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  MediGuard
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Your trusted medication verification assistant. Scan, verify, and stay safe.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-emerald-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/scan" className="text-gray-500 hover:text-emerald-600">
                    Scan Medicine
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-emerald-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-500 hover:text-emerald-600">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:text-emerald-600">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-600">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 MediGuard. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-4 md:mt-0">Made with ❤️ for your health and safety</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
