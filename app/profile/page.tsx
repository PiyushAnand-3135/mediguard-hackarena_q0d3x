"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { supabase } from "@/lib/supabaseClient"

interface Medication {
  id: string
  name: string
  description: string | null
  created_at: string
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [medications, setMedications] = useState<Medication[]>([])

  useEffect(() => {
    const fetchMedications = async () => {
      const { data, error } = await supabase
        .from("medications")
        .select("id, name, description, created_at")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Failed to fetch medications:", error)
      } else {
        setMedications(data || [])
      }
    }

    fetchMedications()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Profile</h1>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* User Info Card */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg overflow-hidden bg-white dark:bg-gray-800 border-0">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                <CardHeader className="text-center">
                  <div className="mx-auto bg-emerald-100 dark:bg-emerald-800 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <CardTitle className="text-xl">{user?.name}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Medication History */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg overflow-hidden bg-white dark:bg-gray-800 border-0">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-500" />
                    Medication History
                  </CardTitle>
                  <CardDescription>Your scanned medications</CardDescription>
                </CardHeader>
                <CardContent>
                  {medications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No medications found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {medications.map((med) => (
                        <Card key={med.id} className="border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base sm:text-lg">{med.name}</CardTitle>
                            <CardDescription className="text-sm">{med.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Scanned on {formatDate(med.created_at)}</span>
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
