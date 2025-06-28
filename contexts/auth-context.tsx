"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { supabase } from "@/lib/supabaseClient"

interface User {
  id: string
  name: string
  email: string
}

interface MedicationHistory {
  id: string
  name: string
  scannedAt: string
  description: string
  activeIngredients: string[]
  riskLevel: "low" | "medium" | "high"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  medicationHistory: MedicationHistory[]
  addMedicationToHistory: (medication: any) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [medicationHistory, setMedicationHistory] = useState<MedicationHistory[]>([])

  // Sync Supabase session to local user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const supabaseUser = session?.user
      if (supabaseUser) {
        setUser({
          id: supabaseUser.id,
          name: supabaseUser.user_metadata.name || "User",
          email: supabaseUser.email ?? "",
        })
      }

      const storedHistory = localStorage.getItem("mediguard_history")
      if (storedHistory) {
        setMedicationHistory(JSON.parse(storedHistory))
      }

      setIsLoading(false)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name || "User",
          email: session.user.email ?? "",
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.user) {
      setIsLoading(false)
      return false
    }

    setUser({
      id: data.user.id,
      name: data.user.user_metadata.name || "User",
      email: data.user.email ?? "",
    })

    setIsLoading(false)
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const addMedicationToHistory = (medication: any) => {
    const newEntry: MedicationHistory = {
      id: Date.now().toString(),
      name: medication.name,
      scannedAt: new Date().toISOString(),
      description: medication.description,
      activeIngredients: medication.activeIngredients.map(
        (ing: any) => `${ing.name} ${ing.amount}`
      ),
      riskLevel:
        medication.interactions.length > 2
          ? "high"
          : medication.interactions.length > 0
          ? "medium"
          : "low",
    }

    const updated = [newEntry, ...medicationHistory]
    setMedicationHistory(updated)
    localStorage.setItem("mediguard_history", JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        medicationHistory,
        addMedicationToHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
