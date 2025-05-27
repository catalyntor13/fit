"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import questions from "@/lib/survey-questions"

interface SurveyFormProps {
  userId: string
}

type SurveyFormData = {
  first_q: string
  second_q: string
  third_q: string
  four_q: string
  five_q: string
  six_q: string
  seven_q: string
  eight_q: string
  nine_q: string
  ten_q: string
  client_name: string
  client_email: string
  client_phone: string
}

export default function SurveyForm({ userId }: SurveyFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({})
  const router = useRouter()

  const totalSteps = questions.length + 1

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SurveyFormData>()

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleCheckboxChange = (field: keyof SurveyFormData, value: string, checked: boolean) => {
    const currentValue = watch(field) || ""
    const values = currentValue ? currentValue.split(", ").filter((v) => v !== "" && v !== value) : []

    if (checked) {
      values.push(value)
    }

    setValue(field, values.join(", "))
  }

  const isCheckboxSelected = (field: keyof SurveyFormData, value: string) => {
    const currentValue = watch(field) || ""
    return currentValue.includes(value)
  }

  const handleCustomInputChange = (questionId: string, value: string) => {
    setCustomInputs((prev) => ({ ...prev, [questionId]: value }))
  }

  const shouldShowCustomInput = (question: any) => {
    if (!question.hasCustomInput) return false

    if (question.type === "radio") {
      return watch(question.id as keyof SurveyFormData) === question.customInputTrigger
    }

    if (question.type === "checkbox") {
      return isCheckboxSelected(question.id as keyof SurveyFormData, question.customInputTrigger as string)
    }

    return false
  }

  const onSubmit: SubmitHandler<SurveyFormData> = async (data) => {
    setLoading(true)
    try {
      // Merge custom inputs with main data
      const finalData = { ...data }
      Object.entries(customInputs).forEach(([questionId, customValue]) => {
        if (customValue.trim()) {
          const currentValue = finalData[questionId as keyof SurveyFormData] || ""
          if (currentValue.includes("Altceva") || currentValue.includes("Alt motiv")) {
            finalData[questionId as keyof SurveyFormData] = `${currentValue}: ${customValue}`
          }
        }
      })

      const { error } = await supabase.from("clienti").insert([
        {
          client_id: userId,
          ...finalData,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error("Insert error details:", error)
        throw error
      }

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("A apărut o eroare la trimiterea formularului")
    } finally {
      setLoading(false)
    }
  }

  // Success message component
  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <Card className="bg-white/95 backdrop-blur shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Mulțumim pentru completarea chestionarului!</h2>
              <p>
                Am primit răspunsurile tale și te vom contacta în curând cu recomandări personalizate pentru a te ajuta
                să îți atingi obiectivele.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Question renderers
  const renderRadioQuestion = (question: any) => (
    <div className="space-y-4">
      <Label className="text-base font-medium">{question.title}</Label>
      <RadioGroup
        value={watch(question.id as keyof SurveyFormData) || ""}
        onValueChange={(value) => setValue(question.id as keyof SurveyFormData, value)}
      >
        {question.options?.map((option: any, idx: number) => (
          <Label
            key={idx}
            htmlFor={`${question.id}-${idx}`}
            className="flex items-center space-x-2 rounded-md border p-3 shadow-sm cursor-pointer hover:bg-gray-50"
          >
            <RadioGroupItem value={option.value} id={`${question.id}-${idx}`} />
            <span>{option.label}</span>
          </Label>
        ))}
      </RadioGroup>
      {shouldShowCustomInput(question) && (
        <Input
          placeholder={question.customInputPlaceholder}
          value={customInputs[question.id] || ""}
          onChange={(e) => handleCustomInputChange(question.id, e.target.value)}
          className="mt-2"
        />
      )}
    </div>
  )

  const renderCheckboxQuestion = (question: any) => (
    <div className="space-y-4">
      <Label className="text-base font-medium">{question.title}</Label>
      <div className="space-y-2">
        {question.options?.map((option: any, idx: number) => (
          <Label
            key={idx}
            htmlFor={`${question.id}-${idx}`}
            className="flex items-center space-x-2 rounded-md border p-3 shadow-sm cursor-pointer hover:bg-gray-50"
          >
            <Checkbox
              id={`${question.id}-${idx}`}
              checked={isCheckboxSelected(question.id as keyof SurveyFormData, option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(question.id as keyof SurveyFormData, option.value, checked as boolean)
              }
            />
            <span>{option.label}</span>
          </Label>
        ))}
      </div>
      {shouldShowCustomInput(question) && (
        <Input
          placeholder={question.customInputPlaceholder}
          value={customInputs[question.id] || ""}
          onChange={(e) => handleCustomInputChange(question.id, e.target.value)}
          className="mt-2"
        />
      )}
    </div>
  )

  const renderNumberQuestion = (question: any) => (
    <div className="space-y-4">
      <Label className="text-base font-medium">{question.title}</Label>
      <div className="flex items-center">
        <Input
          type="number"
          placeholder={question.placeholder}
          {...register(question.id as keyof SurveyFormData)}
          className="max-w-[150px]"
        />
        {question.suffix && <span className="ml-2">{question.suffix}</span>}
      </div>
    </div>
  )

  const renderScaleQuestion = (question: any) => (
    <div className="space-y-4">
      <Label className="text-base font-medium">{question.title}</Label>
      <div className="flex justify-between items-center">
        <RadioGroup
          value={watch(question.id as keyof SurveyFormData) || ""}
          onValueChange={(value) => setValue(question.id as keyof SurveyFormData, value)}
          className="flex space-x-6"
        >
          {Array.from({ length: (question.max || 5) - (question.min || 1) + 1 }).map((_, idx) => {
            const value = String(idx + (question.min || 1))
            return (
              <Label
                key={idx}
                htmlFor={`${question.id}-${value}`}
                className="flex flex-col items-center cursor-pointer"
              >
                <RadioGroupItem value={value} id={`${question.id}-${value}`} />
                <span className="mt-1">{value}</span>
              </Label>
            )
          })}
        </RadioGroup>
      </div>
      {question.minLabel && question.maxLabel && (
        <div className="flex justify-between text-sm text-gray-500 px-2">
          <span>{question.minLabel}</span>
          <span>{question.maxLabel}</span>
        </div>
      )}
    </div>
  )

  // Main question renderer using switch statement
  const renderQuestionContent = (question: any) => {
    switch (question.type) {
      case "radio":
        return renderRadioQuestion(question)
      case "checkbox":
        return renderCheckboxQuestion(question)
      case "number":
        return renderNumberQuestion(question)
      case "scale":
        return renderScaleQuestion(question)
      default:
        return null
    }
  }

  return (
    <div className="max-w-md w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Questions */}
          {currentStep <= questions.length && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/95 backdrop-blur shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">Chestionar de Sănătate și Fitness</CardTitle>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Întrebarea {currentStep} din {totalSteps - 1}
                  </p>
                </CardHeader>
                <CardContent>{renderQuestionContent(questions[currentStep - 1])}</CardContent>
                <CardFooter className="flex justify-between">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Înapoi
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!watch(questions[currentStep - 1].id as keyof SurveyFormData)}
                    className={currentStep === 1 ? "ml-auto" : ""}
                  >
                    Continuă
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* Contact Information */}
          {currentStep === totalSteps && (
            <motion.div
              key="contact-info"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/95 backdrop-blur shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">Datele tale de contact</CardTitle>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">Pasul final</p>
                </CardHeader>
                <CardContent>
                  <div className="border p-4 rounded mb-6">
                    <h3 className="font-medium mb-2">Datele tale de contact</h3>
                    <p className="text-sm">
                      Te rugăm să completezi datele tale de contact pentru a putea primi recomandări personalizate.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client_name">Nume complet</Label>
                      <Input
                        id="client_name"
                        {...register("client_name", { required: true })}
                        placeholder="Numele și prenumele"
                      />
                      {errors.client_name && <p className="text-sm text-red-500">Acest câmp este obligatoriu</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="client_email">Email</Label>
                      <Input
                        id="client_email"
                        type="email"
                        {...register("client_email", {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                        placeholder="exemplu@email.com"
                      />
                      {errors.client_email?.type === "required" && (
                        <p className="text-sm text-red-500">Acest câmp este obligatoriu</p>
                      )}
                      {errors.client_email?.type === "pattern" && (
                        <p className="text-sm text-red-500">Te rugăm să introduci o adresă de email validă</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="client_phone">Număr de telefon</Label>
                      <Input
                        id="client_phone"
                        {...register("client_phone", {
                          required: true,
                          pattern: /^[0-9]{10}$/,
                        })}
                        placeholder="07xxxxxxxx"
                      />
                      {errors.client_phone?.type === "required" && (
                        <p className="text-sm text-red-500">Acest câmp este obligatoriu</p>
                      )}
                      {errors.client_phone?.type === "pattern" && (
                        <p className="text-sm text-red-500">
                          Te rugăm să introduci un număr de telefon valid (10 cifre)
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Înapoi
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="mr-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </span>
                        Se trimite...
                      </>
                    ) : (
                      "Trimite"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}
