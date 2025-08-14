"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from 'lucide-react'
import Link from "next/link"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup, resendVerificationEmail } from "@/app/(auth)/action" 
import { getErrorMessage } from "@/lib/utils"

const registerSchema = z
  .object({
    full_name: z.string().min(1, "Numele complet e obligatoriu"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Parola trebuie sa contina minim 6 caractere"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords nu se potriveste cu cea originala",
    path: ["confirmPassword"],
  })

// Infer the type from the schema
type RegisterFormValues = z.infer<typeof registerSchema>

export default function Register() {
  const [generalError, setGeneralError] = useState("")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setGeneralError("")
    setIsSubmitting(true)

    try {
      // Create FormData to pass to the server action
      const formData = new FormData()
      formData.append('full_name', data.full_name)
      formData.append('email', data.email)
      formData.append('password', data.password)
      
      const result = await signup(formData)
      
      if (result?.error) {
        setGeneralError(result.error)
      } else if (result?.success) {
        // Store the email for display in the success message
        setRegisteredEmail(data.email)
        // Show success message
        setRegistrationComplete(true)
      }
    } catch (error: unknown) {
      setGeneralError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendEmail = async () => {
    if (!registeredEmail) return

    try {
      const result = await resendVerificationEmail(registeredEmail)
      
      if (result?.error) {
        setGeneralError(result.error)
      } else if (result?.success) {
        alert("Verification email has been resent!")
      }
    } catch (error: unknown) {
      setGeneralError(getErrorMessage(error))
    }
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-600 flex flex-col">
        <div className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold">Înregistrare reușită!</h1>
              <p className="text-gray-500 mt-4">
                Îți mulțumim pentru înregistrare. Am trimis un email de confirmare la adresa{" "}
                <strong>{registeredEmail}</strong>.
              </p>
              <p className="text-gray-500 mt-2">
                Te rugăm să verifici căsuța de email și să urmezi link-ul de confirmare pentru a-ți activa contul.
              </p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Nu ai primit email-ul?{" "}
                <button onClick={handleResendEmail} className="text-teal-600 hover:text-teal-500 font-medium">
                  Retrimite email-ul
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-600 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Creeaza Cont</h1>
            <p className="text-gray-500 mt-2">Alatura-te ActiveBoost si transformati afacerea</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                {...register('full_name')}
                className={errors.full_name ? "border-red-500" : ""}
                type="text"
                placeholder="John Doe"
              />
              {errors.full_name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email')}
                className={errors.email ? "border-red-500" : ""}
                type="email"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register('password')}
                className={errors.password ? "border-red-500" : ""}
                type="password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-red-500" : ""}
                type="password"
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

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 hover:text-teal-500 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}