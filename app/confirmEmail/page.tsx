"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react"

// Define the valid email OTP types that Supabase accepts for token_hash verification
type EmailOtpType = "signup" | "invite" | "magiclink" | "recovery" | "email_change"

// Type guard to check if the type is a valid email OTP type
const isValidEmailOtpType = (type: string | null): type is EmailOtpType => {
  return type !== null && ["signup", "invite", "magiclink", "recovery", "email_change"].includes(type)
}


export default function ChangeEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const changeEmailFn = async () => {

      // Get the token and type from URL parameters
      const token = searchParams.get("token_hash")
      const type = searchParams.get("type")
    

      if (token && isValidEmailOtpType(type)) {
        try {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
             type: type,
          })

          if (error) {
            console.error("Confirmation error:", error)
            setStatus("error")
            setMessage(error.message || "Failed to confirm email")
            return
          }

          if (data.user) {
            setStatus("success")
            setMessage("Email confirmed successfully!")

            // Wait a moment then redirect to payment
            setTimeout(() => {
              router.push("/settings")
            }, 2000)
          }
        } catch (error) {
          console.error("Unexpected error:", error)
          setStatus("error")
          setMessage("An unexpected error occurred")
        }
      } else {
        setStatus("error")
        setMessage("Invalid confirmation link")
      }
    }

    changeEmailFn()
  }, [searchParams, router])

  const handleResendEmail = async () => {
    // You can implement resend logic here if needed
    router.push("/register?resend=true")
  }

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Confirming your email...</h2>
            <p className="text-muted-foreground">Please wait while we verify your email address.</p>
          </div>
        )

      case "success":
        return (
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Email Confirmed!</h2>
            <p className="text-muted-foreground mb-4">{message}</p>
            <p className="text-sm text-muted-foreground">Redirecting to settings page</p>
          </div>
        )

      case "error":
        return (
          <div className="text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Confirmation Failed</h2>
            <p className="text-muted-foreground mb-4">{message}</p>
            <div className="space-y-2">
              <Button onClick={handleResendEmail} variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Resend Confirmation Email
              </Button>
              <Button onClick={() => router.push("/login")} className="w-full">
                Back to Login
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Confirmation</CardTitle>
          <CardDescription>We&apos;re changing your email address</CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}
