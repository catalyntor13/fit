"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {  z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { login } from "@/app/(auth)/action"
import { getErrorMessage } from "@/lib/utils"

// Define the form schema with zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const [generalError, setGeneralError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setGeneralError("")
    setIsSubmitting(true)
    
    try {
      // Create FormData to pass to the server action
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      
      const result = await login(formData)
      
      if (result?.error) {
        setGeneralError(result.error)
      }

      // No need to handle success case as the server action will redirect
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
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your ActiveFit account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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

          {generalError && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {generalError}
            </div>
          )}

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="text-right">
  <Link
    href="/forgot-password"
    className="text-sm text-teal-600 hover:text-teal-500 font-medium"
  >
    Forgot your password?
  </Link>
</div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don`&apos;`t have an account?{" "}
            <Link href="/register" className="text-teal-600 hover:text-teal-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
