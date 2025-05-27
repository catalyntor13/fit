"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Mail, UserCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function AccountConfirm() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [confirmationType, setConfirmationType] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmEmail = async () => {
  try {
    // Get the token and type from the URL
    const token_hash = searchParams.get("token_hash") || searchParams.get("token")
    const type = searchParams.get("type")


    if (!token_hash || !type) {
      setStatus("error")
      setErrorMessage("Link invalid sau parametri lipsă")
      return
    }

    setConfirmationType(type)

    // Verify the email/token
    const { error, data } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    })

    if (error) {
      throw error
    }

    // If this is an email change, update the profiles table
    if (type === "email_change" && data.user) {
      console.log("Updating profiles table with new email:", data.user.email)
      
      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({
          email: data.user.email,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.user.id)

      if (profileUpdateError) {
        console.error("Error updating profile:", profileUpdateError)
        // Don't throw here - email change was successful, profile update is secondary
      } else {
        console.log("Profile updated successfully with new email")
      }
    }

    // If successful, set status and handle different redirect logic
    setStatus("success")

    // Different redirect logic based on confirmation type
    setTimeout(() => {
      if (type === "email_change") {
        // For email change, redirect to login since session might be invalidated
        router.push("/login?message=Email schimbat cu succes")
      } else if (type === "signup" || type === "email") {
        // For account confirmation, redirect to welcome/checkout
        if (data.user) {
          router.push(`/welcome?user_id=${data.user.id}`)
        } else {
          router.push("/login?message=Cont confirmat cu succes")
        }
      } else {
        // Default redirect
        router.push("/login")
      }
    }, 2000)

  } catch (error: any) {
    console.error("Error confirming:", error)
    setStatus("error")
    
    // Set error message based on type
    const type = searchParams.get("type")
    if (type === "email_change") {
      setErrorMessage("A apărut o eroare la confirmarea schimbării email-ului. Link-ul poate fi expirat.")
    } else {
      setErrorMessage(error.message || "A apărut o eroare la confirmarea contului")
    }
  }
}

    confirmEmail()
  }, [searchParams, router])

  // Get title based on confirmation type
  const getTitle = () => {
    if (confirmationType === "email_change") {
      return "Confirmăm schimbarea email-ului..."
    }
    return "Confirmăm contul tău..."
  }

  const getSuccessTitle = () => {
    if (confirmationType === "email_change") {
      return "Email schimbat cu succes!"
    }
    return "Cont confirmat cu succes!"
  }

  const getSuccessMessage = () => {
    if (confirmationType === "email_change") {
      return "Email-ul tău a fost schimbat cu succes. Te poți loga acum cu noua adresă de email."
    }
    return "Contul tău a fost confirmat. Vei fi redirecționat către pagina de plată în câteva momente."
  }

  const getSuccessIcon = () => {
    if (confirmationType === "email_change") {
      return <Mail className="h-8 w-8 text-green-600" />
    }
    return <CheckCircle className="h-8 w-8 text-green-600" />
  }

  const getErrorButton = () => {
    if (confirmationType === "email_change") {
      return (
        <div className="space-y-2">

          <Button 
            onClick={() => router.push("/login")} 
            variant="outline"
            className="w-full cursor-pointer"
          >
            Înapoi la Login
          </Button>
        </div>
      )
    }
    return (
      <Button 
        onClick={() => router.push("/register")} 
        className="bg-teal-600 hover:bg-teal-700"
      >
        Înapoi la înregistrare
      </Button>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-6">
          {status === "loading" && (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">{getTitle()}</h2>
              <p className="text-gray-500">Te rugăm să aștepți un moment.</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  {getSuccessIcon()}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">{getSuccessTitle()}</h2>
              <p className="text-gray-500 mb-4">{getSuccessMessage()}</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">A apărut o eroare</h2>
              <p className="text-gray-500 mb-4">{errorMessage}</p>
              {getErrorButton()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}