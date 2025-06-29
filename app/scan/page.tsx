"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Upload,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Share2,
  Download,
} from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { UploadPrescription } from "@/components/upload-prescription"
import { AnalyzeComposition } from "@/components/analyze-composition"
import { SuggestAlternatives } from "@/components/suggest-alternatives"
import { CheckInteractions } from "@/components/check-interactions"
import Link from "next/link"

export default function ScanPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [medicationData, setMedicationData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("composition")
  const [searchInput, setSearchInput] = useState("")

  const handleImageProcessed = async (imageData: string) => {
    setIsProcessing(true)
    setError(null)

    try {
      const ocrResponse = await fetch("http://localhost:8000/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      })

      if (!ocrResponse.ok) throw new Error("❌ Failed to extract text from image")

      const ocrResult = await ocrResponse.json()
      const cleanedTexts = ocrResult.texts.map((t: string) => t.toLowerCase().trim()).filter(Boolean)

      const response = await fetch("/api/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokens: cleanedTexts }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze medication")
      }

      const data = await response.json()
      setMedicationData(data)
    } catch (err: any) {
      setError(err.message || "Failed to process the image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleManualSearch = async () => {
    if (!searchInput.trim()) return
    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch("/api/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokens: [searchInput.trim().toLowerCase()] }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze medication")
      }

      const data = await response.json()
      setMedicationData(data)
    } catch (err: any) {
      setError(err.message || "Failed to search. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-emerald-50/20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-repeat z-0 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent z-0 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-emerald-200 rounded-full blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-teal-200 rounded-full blur-3xl opacity-20 z-0" />

      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Button>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Scan Medicine
            </h1>
          </div>
          {medicationData && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full text-gray-700 border-gray-300">
                <Share2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full text-gray-700 border-gray-300" onClick={() => window.print()}>
                <Download className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="mb-6 w-full max-w-xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search medicine manually..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={handleManualSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Upload Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg overflow-hidden bg-white text-gray-900">
              <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Upload Prescription</CardTitle>
                <CardDescription className="text-base">Take a clear photo of your medicine label or prescription</CardDescription>
              </CardHeader>
              <CardContent>
                <UploadPrescription onImageProcessed={handleImageProcessed} />
              </CardContent>
            </Card>

            {!medicationData && !isProcessing && (
              <div className="mt-6">
                <Card className="border border-emerald-100 bg-emerald-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Need help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-700">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Ensure good lighting when taking a photo</li>
                        <li>Keep the medicine label flat and centered</li>
                        <li>Make sure text is clearly visible</li>
                      </ul>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Result Area */}
          <div className="lg:col-span-2">
            {isProcessing ? (
              <Card className="border-0 shadow-lg bg-white h-full">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                <div className="flex flex-col items-center justify-center h-full p-6 sm:p-12">
                  <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
                  <p className="text-2xl font-semibold mt-6">Processing your request...</p>
                  <p className="text-base text-gray-500 mt-2 max-w-md text-center">
                    Our AI is analyzing the medication details and checking for potential interactions
                  </p>
                </div>
              </Card>
            ) : error ? (
              <Alert variant="destructive" className="shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="text-base">{error}</AlertDescription>
              </Alert>
            ) : medicationData ? (
              <Card className="border-0 shadow-lg overflow-hidden bg-white">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                <CardHeader className="border-b bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 mb-2">
                        Verified
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl font-bold">{medicationData.name}</CardTitle>
                      <CardDescription className="text-base text-gray-600">{medicationData.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 border-b bg-transparent h-auto">
                      <TabsTrigger value="composition" className="py-4 text-base font-medium border-b-2 data-[state=active]:border-emerald-500">
                        Composition
                      </TabsTrigger>
                      <TabsTrigger value="alternatives" className="py-4 text-base font-medium border-b-2 data-[state=active]:border-emerald-500">
                        Alternatives
                      </TabsTrigger>
                      <TabsTrigger value="interactions" className="py-4 text-base font-medium border-b-2 data-[state=active]:border-emerald-500">
                        Interactions
                      </TabsTrigger>
                    </TabsList>
                    <div className="p-6">
                      <TabsContent value="composition" className="mt-0">
                        <AnalyzeComposition medication={medicationData} />
                      </TabsContent>
                      <TabsContent value="alternatives" className="mt-0">
                        <SuggestAlternatives medication={medicationData} />
                      </TabsContent>
                      <TabsContent value="interactions" className="mt-0">
                        <CheckInteractions medication={medicationData} />
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 border-t p-4 bg-gray-50">
                  <Button variant="outline" onClick={() => setMedicationData(null)} className="w-full sm:w-auto">
                    Scan Another
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white w-full sm:w-auto"
                    onClick={() => window.print()}
                  >
                    Save Results
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 sm:p-12 border-2 border-dashed border-emerald-200 rounded-lg bg-emerald-50/30">
                <div className="bg-white p-6 rounded-full shadow-md mb-6">
                  <Upload className="h-10 w-10 text-emerald-400" />
                </div>
                <p className="text-2xl font-semibold text-center">No image uploaded yet</p>
                <p className="text-base text-gray-500 text-center mt-2 max-w-md">
                  Upload a medicine label or prescription to get started with your medication analysis
                </p>
                <Button
                  className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                  onClick={() => document.getElementById("upload-trigger")?.click()}
                >
                  Upload Image
                </Button>
                <button id="upload-trigger" className="hidden" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}