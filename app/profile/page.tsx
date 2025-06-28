"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Pill, User, Clock, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function ProfilePage() {
  const { user, medicationHistory, logout } = useAuth()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-50 border-red-200 text-red-700"
      case "medium":
        return "bg-amber-50 border-amber-200 text-amber-700"
      case "low":
        return "bg-emerald-50 border-emerald-200 text-emerald-700"
      default:
        return "bg-gray-50 border-gray-200 text-gray-700"
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* User Info Card */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg overflow-hidden bg-white">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">{user?.name}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-700">Total Scans</span>
                        <span className="font-bold text-emerald-600">{medicationHistory.length}</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">This Month</span>
                        <span className="font-bold text-blue-600">
                          {medicationHistory.filter(
                            (med) => new Date(med.scannedAt).getMonth() === new Date().getMonth()
                          ).length}
                        </span>
                      </div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-amber-700">High Risk</span>
                        <span className="font-bold text-amber-600">
                          {medicationHistory.filter((med) => med.riskLevel === "high").length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Medication History */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg overflow-hidden bg-white">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-500" />
                    Medication History
                  </CardTitle>
                  <CardDescription>Your recently scanned medications</CardDescription>
                </CardHeader>
                <CardContent>
                  {medicationHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Pill className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No medications scanned yet</p>
                      <Link href="/scan">
                        <Button className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                          Scan Your First Medicine
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {medicationHistory.map((medication) => (
                        <Card key={medication.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-base sm:text-lg">{medication.name}</CardTitle>
                                <CardDescription className="text-sm">{medication.description}</CardDescription>
                              </div>
                              <Badge className={`${getRiskColor(medication.riskLevel)} border text-xs`}>
                                <span className="flex items-center gap-1">
                                  {getRiskIcon(medication.riskLevel)}
                                  {medication.riskLevel.toUpperCase()}
                                </span>
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Active Ingredients:</p>
                                <div className="flex flex-wrap gap-1">
                                  {medication.activeIngredients?.map((ing: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {ing}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Scanned on {formatDate(medication.scannedAt)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
