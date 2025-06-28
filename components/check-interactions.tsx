import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from "lucide-react"

interface CheckInteractionsProps {
  medication: {
    name: string
    interactions: Array<{
      substance: string
      severity: "high" | "medium" | "low"
      description: string
    }>
    sideEffects: Array<{
      name: string
      frequency: "common" | "uncommon" | "rare"
    }>
  }
}

export function CheckInteractions({ medication }: CheckInteractionsProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center">
          <span className="bg-emerald-100 p-1.5 rounded-full mr-2">
            <ShieldAlert className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
          </span>
          Drug Interactions
        </h3>
        {medication.interactions.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {medication.interactions.map((interaction, index) => (
              <Alert
                key={index}
                variant={
                  interaction.severity === "high"
                    ? "destructive"
                    : interaction.severity === "medium"
                      ? "default"
                      : "outline"
                }
                className={`text-xs sm:text-sm ${
                  interaction.severity === "high"
                    ? "border-red-200 bg-red-50 text-red-800"
                    : interaction.severity === "medium"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-blue-200 bg-blue-50 text-blue-800"
                }`}
              >
                {interaction.severity === "high" ? (
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : interaction.severity === "medium" ? (
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                <AlertTitle className="flex items-center flex-wrap gap-2 font-semibold mb-1 text-xs sm:text-sm">
                  {interaction.substance}
                  <Badge
                    variant={
                      interaction.severity === "high"
                        ? "destructive"
                        : interaction.severity === "medium"
                          ? "default"
                          : "outline"
                    }
                    className={`text-xs ${
                      interaction.severity === "high"
                        ? "bg-red-200 text-red-800 hover:bg-red-300 border-0"
                        : interaction.severity === "medium"
                          ? "bg-amber-200 text-amber-800 hover:bg-amber-300 border-0"
                          : "bg-blue-200 text-blue-800 hover:bg-blue-300 border-0"
                    }`}
                  >
                    {interaction.severity.toUpperCase()}
                  </Badge>
                </AlertTitle>
                <AlertDescription className="text-xs sm:text-sm">{interaction.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800 text-xs sm:text-sm">
            <Info className="h-4 w-4" />
            <AlertTitle>No known interactions</AlertTitle>
            <AlertDescription>
              No significant drug interactions have been identified for this medication.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Side Effects</h3>
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b py-3 px-3 sm:px-4">
            <CardTitle className="text-base sm:text-xl">Potential Side Effects</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Side effects are listed by frequency of occurrence
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-red-100">
                <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3 flex items-center">
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0 mr-2 text-xs">Common</Badge>
                </h4>
                <ul className="space-y-1 sm:space-y-2">
                  {medication.sideEffects
                    .filter((effect) => effect.frequency === "common")
                    .map((effect, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-red-500"></span>
                        <span>{effect.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-amber-100">
                <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3 flex items-center">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0 mr-2 text-xs">
                    Uncommon
                  </Badge>
                </h4>
                <ul className="space-y-1 sm:space-y-2">
                  {medication.sideEffects
                    .filter((effect) => effect.frequency === "uncommon")
                    .map((effect, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-amber-500"></span>
                        <span>{effect.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3 flex items-center">
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-0 mr-2 text-xs">Rare</Badge>
                </h4>
                <ul className="space-y-1 sm:space-y-2">
                  {medication.sideEffects
                    .filter((effect) => effect.frequency === "rare")
                    .map((effect, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-gray-500"></span>
                        <span>{effect.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
