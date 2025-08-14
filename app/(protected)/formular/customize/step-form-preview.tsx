"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, CheckCircle, Play } from "lucide-react"
import type { StepForm } from "@/lib/StepFormTypes"

interface StepFormPreviewProps {
  form: StepForm
}

export default function StepFormPreview({ form }: StepFormPreviewProps) {
  const [currentStep, setCurrentStep] = useState(-1) // -1 = welcome, steps.length = thank you
  const [formData, setFormData] = useState<Record<string, string | string[]>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = form.steps.length
  const isWelcomeScreen = currentStep === -1
  const isThankYouScreen = currentStep === totalSteps
  const currentField = !isWelcomeScreen && !isThankYouScreen ? form.steps[currentStep] : null

  const validateCurrentStep = (): boolean => {
    if (!currentField) return true

    const value = formData[currentField.id]
    const newErrors = { ...errors }

    if (currentField.required && (!value || (Array.isArray(value) && value.length === 0))) {
      newErrors[currentField.id] = "Acest câmp este obligatoriu"
      setErrors(newErrors)
      return false
    }

    if (currentField.type === "email" && value && typeof value === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        newErrors[currentField.id] = "Adresa de email nu este validă"
        setErrors(newErrors)
        return false
      }
    }

    if (currentField.type === "number" && value && typeof value === "string") {
      const numValue = Number.parseInt(value)
      if (isNaN(numValue)) {
        newErrors[currentField.id] = "Introdu un număr valid"
        setErrors(newErrors)
        return false
      }
      if (currentField.min !== undefined && numValue < currentField.min) {
        newErrors[currentField.id] = `Valoarea minimă este ${currentField.min}`
        setErrors(newErrors)
        return false
      }
      if (currentField.max !== undefined && numValue > currentField.max) {
        newErrors[currentField.id] = `Valoarea maximă este ${currentField.max}`
        setErrors(newErrors)
        return false
      }
    }

    // Clear error if validation passes
    delete newErrors[currentField.id]
    setErrors(newErrors)
    return true
  }

  const nextStep = () => {
    if (isWelcomeScreen) {
      setCurrentStep(0)
      return
    }

    if (!validateCurrentStep()) return

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (fieldId: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const handleSubmit = () => {
    console.log("Date formular:", formData)
    alert("Formularul a fost trimis cu succes! (Aceasta este doar o demonstrație)")
  }

  const progressPercentage = isWelcomeScreen ? 0 : isThankYouScreen ? 100 : ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="min-h-[500px]">
        {/* Progress Bar */}
        {!isWelcomeScreen && (
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                {isThankYouScreen ? "Complet" : `Pasul ${currentStep + 1} din ${totalSteps}`}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <CardHeader className="text-center">
          {isWelcomeScreen && (
            <>
              <CardTitle className="text-2xl mb-2">{form.title}</CardTitle>
              <p className="text-gray-600">{form.description}</p>
            </>
          )}
          {isThankYouScreen && (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Mulțumim!</CardTitle>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Welcome Screen */}
          {isWelcomeScreen && (
            <div className="text-center space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">{form.welcomeMessage}</p>
              <Button onClick={nextStep} size="lg" className="px-8">
                <Play className="w-5 h-5 mr-2" />
                Începe
              </Button>
            </div>
          )}

          {/* Thank You Screen */}
          {isThankYouScreen && (
            <div className="text-center space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">{form.thankYouMessage}</p>
              <Button onClick={handleSubmit} size="lg" className="px-8">
                Finalizează
              </Button>
            </div>
          )}

          {/* Current Step */}
          {currentField && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{currentField.question}</h3>
                {currentField.placeholder && <p className="text-gray-600">{currentField.placeholder}</p>}
              </div>

              <div className="space-y-4">
                {currentField.type === "text" && (
                  <Input
                    type="text"
                    value={(formData[currentField.id] as string) || ""}
                    onChange={(e) => updateFormData(currentField.id, e.target.value)}
                    placeholder={currentField.placeholder}
                    maxLength={currentField.maxLength}
                    className={errors[currentField.id] ? "border-red-500" : ""}
                  />
                )}

                {currentField.type === "email" && (
                  <Input
                    type="email"
                    value={(formData[currentField.id] as string) || ""}
                    onChange={(e) => updateFormData(currentField.id, e.target.value)}
                    placeholder={currentField.placeholder}
                    className={errors[currentField.id] ? "border-red-500" : ""}
                  />
                )}

                {currentField.type === "number" && (
                  <Input
                    type="number"
                    value={(formData[currentField.id] as string) || ""}
                    onChange={(e) => updateFormData(currentField.id, e.target.value)}
                    placeholder={currentField.placeholder}
                    min={currentField.min}
                    max={currentField.max}
                    className={errors[currentField.id] ? "border-red-500" : ""}
                  />
                )}

                {currentField.type === "textarea" && (
                  <Textarea
                    value={(formData[currentField.id] as string) || ""}
                    onChange={(e) => updateFormData(currentField.id, e.target.value)}
                    placeholder={currentField.placeholder}
                    rows={currentField.rows || 3}
                    className={errors[currentField.id] ? "border-red-500" : ""}
                  />
                )}

                {currentField.type === "select" && (
                  <Select
                    value={(formData[currentField.id] as string) || ""}
                    onValueChange={(value) => updateFormData(currentField.id, value)}
                  >
                    <SelectTrigger className={errors[currentField.id] ? "border-red-500" : ""}>
                      <SelectValue placeholder={currentField.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentField.options?.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {currentField.type === "radio" && (
                  <RadioGroup
                    value={(formData[currentField.id] as string) || ""}
                    onValueChange={(value) => updateFormData(currentField.id, value)}
                    className="space-y-3"
                  >
                    {currentField.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${currentField.id}-${index}`} />
                        <Label htmlFor={`${currentField.id}-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentField.type === "checkbox" && (
                  <div className="space-y-3">
                    {currentField.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${currentField.id}-${index}`}
                          checked={((formData[currentField.id] as string[]) || []).includes(option)}
                          onCheckedChange={(checked) => {
                            const currentValues = (formData[currentField.id] as string[]) || []
                            if (checked) {
                              updateFormData(currentField.id, [...currentValues, option])
                            } else {
                              updateFormData(
                                currentField.id,
                                currentValues.filter((v) => v !== option),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={`${currentField.id}-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {errors[currentField.id] && <p className="text-red-500 text-sm">{errors[currentField.id]}</p>}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!isWelcomeScreen && !isThankYouScreen && (
            <div className="flex justify-between pt-6">
              <Button onClick={prevStep} variant="outline" disabled={currentStep === 0}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi
              </Button>
              <Button onClick={nextStep}>
                {currentStep === totalSteps - 1 ? "Finalizează" : "Următorul"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
