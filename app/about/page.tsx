import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, Pill, AlertCircle, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-8 w-8 text-emerald-500" />
          <h1 className="text-3xl font-bold">About MediGuard</h1>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            MediGuard is a GenAI-powered health application designed to help users make informed decisions about their
            medications. Our mission is to provide accessible, accurate information about medications, their
            interactions, and alternatives.
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-emerald-500" />
                  OCR Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our advanced OCR technology can scan and extract information from medicine labels and prescriptions,
                  making it easy to get detailed information about your medications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-emerald-500" />
                  Interaction Checking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  MediGuard checks for potential drug interactions and side effects, helping you avoid harmful
                  combinations and understand risks associated with your medications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-emerald-500" />
                  Alternative Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find generic and branded alternatives to your medications, potentially saving you money while
                  maintaining the same therapeutic effects.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  Comprehensive Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get detailed information about active and inactive ingredients, helping you make informed decisions
                  about your health.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">How It Works</h2>

          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li className="text-gray-700">
              <span className="font-medium">Upload or Scan</span>: Take a photo of your medicine label or prescription,
              or upload an existing image.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Extract Information</span>: Our OCR technology extracts the medication
              details from the image.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Analyze</span>: MediGuard analyzes the medication composition and checks for
              potential interactions.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Review Results</span>: Get comprehensive information about your medication,
              including alternatives and side effects.
            </li>
          </ol>

          <div className="bg-emerald-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Commitment to Privacy</h2>
            <p className="text-gray-700">
              At MediGuard, we take your privacy seriously. All uploaded images and medication information are processed
              securely and are not stored permanently on our servers. We do not share your personal health information
              with third parties.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
          <div className="bg-amber-50 p-6 rounded-lg">
            <p className="text-amber-800">
              MediGuard is designed to provide information and is not a substitute for professional medical advice.
              Always consult with a healthcare professional before making decisions about your medications or treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
