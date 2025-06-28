import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, ExternalLink, Sparkles, TrendingDown } from "lucide-react"

interface SuggestAlternativesProps {
  medication: {
    name: string
    alternatives: Array<{
      name: string
      type: "generic" | "branded"
      price: string
      availability: "high" | "medium" | "low"
      similarityScore: number
    }>
  }
}

export function SuggestAlternatives({ medication }: SuggestAlternativesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base sm:text-lg font-medium flex items-center">
          <span className="bg-emerald-100 p-1.5 rounded-full mr-2">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
          </span>
          Alternative Medications
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs">
            Generic
          </Badge>
          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 text-xs">
            Branded
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {medication.alternatives.map((alternative, index) => (
          <Card
            key={index}
            className={`overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow ${
              alternative.type === "generic"
                ? "bg-gradient-to-r from-emerald-50 to-white"
                : "bg-gradient-to-r from-blue-50 to-white"
            }`}
          >
            <CardHeader
              className={`pb-2 sm:pb-3 px-3 sm:px-4 ${alternative.type === "generic" ? "border-b border-emerald-100" : "border-b border-blue-100"}`}
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <CardTitle className="text-sm sm:text-base">{alternative.name}</CardTitle>
                    {alternative.type === "generic" && (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 text-xs">
                        <TrendingDown className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        Savings
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Similarity Score: {alternative.similarityScore}%
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={
                    alternative.type === "generic"
                      ? "bg-emerald-100 border-emerald-200 text-emerald-700 text-xs"
                      : "bg-blue-100 border-blue-200 text-blue-700 text-xs"
                  }
                >
                  {alternative.type === "generic" ? "Generic" : "Branded"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="py-3 sm:py-4 px-3 sm:px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Price</p>
                  <p className="font-medium text-base sm:text-lg">{alternative.price}</p>
                </div>
                <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Availability</p>
                  <div className="flex items-center">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 sm:h-2 w-5 sm:w-8 rounded-full mr-1 ${
                          (alternative.availability === "high" && i < 3) ||
                          (alternative.availability === "medium" && i < 2) ||
                          (alternative.availability === "low" && i < 1)
                            ? "bg-emerald-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs sm:text-sm ml-1">
                      {alternative.availability.charAt(0).toUpperCase() + alternative.availability.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 bg-white border-t border-gray-100 px-3 sm:px-4 py-2 sm:py-3">
              <Button variant="outline" size="sm" className="rounded-full text-xs w-full sm:w-auto">
                <Check className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Compare
              </Button>
              <Button
                size="sm"
                className={
                  alternative.type === "generic"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-full text-xs w-full sm:w-auto mt-2 sm:mt-0"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-xs w-full sm:w-auto mt-2 sm:mt-0"
                }
              >
                <ExternalLink className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Find Pharmacy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 text-xs sm:text-sm text-gray-600 mt-4">
        <p>
          Note: Prices may vary by location and pharmacy. Always consult with a healthcare professional before switching
          medications.
        </p>
      </div>
    </div>
  )
}
