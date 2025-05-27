"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { forgotPassword } from "@/app/(auth)/action"
import { getErrorMessage } from "@/lib/utils"

// Define the form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const [generalError, setGeneralError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setGeneralError("")
    setSuccessMessage("")
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("email", data.email)

      const result = await forgotPassword(formData)

      if (result?.error) {
        setGeneralError(result.error)
      } else if (result?.success) {
        setSuccessMessage(result.message)
      }
    } catch (error: unknown) {
      setGeneralError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-gray-500 mt-2">
            Enter your email address and we`&apos;`ll send you a link to reset your password
          </p>
        </div>

        {successMessage ? (
          <div className="space-y-6">
            <div className="bg-green-50 text-green-500 p-4 rounded-md flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Email sent successfully!</p>
                <p className="text-sm mt-1">{successMessage}</p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500">
                Didn`&apos;`t receive the email? Check your spam folder or try again.
              </p>
              <Button
                onClick={() => {
                  setSuccessMessage("")
                  setGeneralError("")
                }}
                variant="outline"
                className="w-full"
              >
                Send Another Email
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className={errors.email ? "border-red-500" : ""}
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
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
              {isSubmitting ? "Sending..." : "Send Reset Email"}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-teal-600 hover:text-teal-500 font-medium flex items-center justify-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  )
}