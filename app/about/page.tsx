import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Shield,
  Search,
  Pill,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-emerald-50/20 py-10 px-4 font-sans">
      {/* Glow Background Blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-emerald-200 rounded-full filter blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-teal-300 rounded-full filter blur-3xl opacity-20 z-0" />

      <div className="relative max-w-5xl mx-auto z-10 text-gray-800 text-lg">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-9 w-9 text-emerald-500" />
          <h1 className="text-4xl font-bold">About MediGuard</h1>
        </div>

        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
          MediGuard is a GenAI-powered health application designed to help users make informed decisions about their
          medications. Our mission is to provide accessible, accurate information about medications, their interactions,
          and alternatives.
        </p>

        <h2 className="text-3xl font-bold text-emerald-600 mb-4">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {[
            {
              icon: <Search className="h-6 w-6 text-emerald-600" />,
              title: "OCR Technology",
              desc: "Scan and extract information from medicine labels and prescriptions using advanced OCR.",
            },
            {
              icon: <AlertCircle className="h-6 w-6 text-emerald-600" />,
              title: "Interaction Checking",
              desc: "Check for harmful drug interactions and side effects in real time.",
            },
            {
              icon: <Pill className="h-6 w-6 text-emerald-600" />,
              title: "Alternative Medications",
              desc: "Discover generic and branded alternatives with similar therapeutic effects.",
            },
            {
              icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
              title: "Comprehensive Information",
              desc: "Understand active/inactive ingredients to make informed decisions about your health.",
            },
          ].map((feature, i) => (
            <Card key={i} className="border border-gray-100 shadow-md bg-white">
              <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
              <CardHeader className="pb-1">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  {feature.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-emerald-600 mb-4">How It Works</h2>
        <ol className="list-decimal pl-6 space-y-4 mb-10 text-gray-700 text-lg leading-relaxed">
          <li>
            <span className="font-semibold">Upload or Scan</span>: Take a photo of your medicine label or prescription,
            or upload an image.
          </li>
          <li>
            <span className="font-semibold">Extract Information</span>: Our OCR extracts medication details from the
            image.
          </li>
          <li>
            <span className="font-semibold">Analyze</span>: MediGuard analyzes the composition and checks for
            interactions.
          </li>
          <li>
            <span className="font-semibold">Review Results</span>: Get comprehensive information including alternatives
            and side effects.
          </li>
        </ol>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg mb-10 shadow">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">Our Commitment to Privacy</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We take your privacy seriously. All uploaded images and information are processed securely and not stored
            permanently. We do not share your personal health data with third parties.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-amber-700 mb-4">Disclaimer</h2>
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow">
          <p className="text-amber-800 text-lg leading-relaxed">
            MediGuard provides information but is not a substitute for professional medical advice. Always consult with
            a healthcare provider before making medical decisions.
          </p>
        </div>
      </div>
    </div>
  )
}
