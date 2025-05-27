"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from 'lucide-react'
import { supabase } from "@/lib/supabaseClient" 
import { getErrorMessage } from "@/lib/utils"

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPassword() {
  const [generalError, setGeneralError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token')
      const type = searchParams.get('type')

      if (!token || type !== 'recovery') {
        setGeneralError("Invalid or missing reset token. Please request a new password reset.")
        setIsLoading(false)
        return
      }

      try {
        // Use the supabase instance directly
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'recovery'
        })

        if (error) {
          console.error("Token verification error:", error)
          setGeneralError("Invalid or expired reset token. Please request a new password reset.")
        } else if (data.session) {
          setIsValidToken(true)
        } else {
          setGeneralError("Invalid reset token. Please request a new password reset.")
        }
      } catch (error) {
        console.error("Token verification error:", error)
        setGeneralError("An error occurred while verifying the reset token.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [searchParams])

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setGeneralError("")
    setSuccessMessage("")
    setIsSubmitting(true)

    try {
      // Use the supabase instance directly
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (error) {
        setGeneralError(error.message)
      } else {
        setSuccessMessage("Password updated successfully! Redirecting to login...")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error: unknown) {
      setGeneralError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-blue-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Verifying reset token...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-gray-500 mt-2">Enter your new password below</p>
        </div>

        {successMessage ? (
          <div className="bg-green-50 text-green-500 p-4 rounded-md flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">Success!</p>
              <p className="text-sm mt-1">{successMessage}</p>
            </div>
          </div>
        ) : isValidToken ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                className={errors.password ? "border-red-500" : ""}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                className={errors.confirmPassword ? "border-red-500" : ""}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {generalError && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {generalError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 text-red-500 p-4 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Invalid Reset Link</p>
                <p className="text-sm mt-1">{generalError}</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/forgot-password")}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Request New Reset Link
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}