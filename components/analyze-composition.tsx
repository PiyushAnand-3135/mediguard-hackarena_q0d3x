import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Pill } from "lucide-react"

interface AnalyzeCompositionProps {
  medication: {
    name: string
    activeIngredients: Array<{
      name: string
      amount: string
    }>
    inactiveIngredients: string[]
  }
}

export function AnalyzeComposition({ medication }: AnalyzeCompositionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center">
          <span className="bg-emerald-100 p-1.5 rounded-full mr-2">
            <Pill className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
          </span>
          Active Ingredients
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {medication.activeIngredients.map((ingredient, index) => (
            <Card key={index} className="overflow-hidden border border-emerald-100 hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 py-2 sm:py-3 px-3 sm:px-4">
                <CardTitle className="text-sm sm:text-base">{ingredient.name}</CardTitle>
              </CardHeader>
              <CardContent className="py-2 sm:py-3 px-3 sm:px-4">
                <CardDescription className="flex items-center justify-between">
                  <span>Amount</span>
                  <Badge variant="outline" className="bg-white font-medium text-xs sm:text-sm">
                    {ingredient.amount}
                  </Badge>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Inactive Ingredients</h3>
        <div className="flex flex-wrap gap-2">
          {medication.inactiveIngredients.map((ingredient, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs sm:text-sm"
            >
              {ingredient}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-3 sm:p-5 rounded-xl flex items-start gap-3 border border-blue-100 shadow-sm">
        <div className="bg-blue-100 p-1.5 rounded-full mt-0.5 flex-shrink-0">
          <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
        </div>
        <div>
          <p className="text-xs sm:text-sm text-blue-700 font-medium">Important Information</p>
          <p className="text-xs sm:text-sm text-blue-600 mt-1">
            Always consult with a healthcare professional before taking any medication. The information provided is for
            reference only.
          </p>
        </div>
      </div>
    </div>
  )
}
