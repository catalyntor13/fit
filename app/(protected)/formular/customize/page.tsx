"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Settings, Save, Trash2, ArrowUp, ArrowDown, Edit3, Play } from 'lucide-react'
import type { StepFormField, StepForm } from "@/lib/StepFormTypes"
import StepFieldEditor from "./step-field-editor"
import StepFormPreview from "./step-form-preview"

const MAX_QUESTIONS = 8

export default function StepFormBuilder() {
  const [form, setForm] = useState<StepForm>({
    id: "",
    title: "Formular de Lead Generation",
    description: "Completează pas cu pas pentru a primi oferta personalizată",
    welcomeMessage: "Bun venit! Îți vom pune câteva întrebări rapide pentru a-ți oferi cea mai bună soluție.",
    thankYouMessage: "Mulțumim! Echipa noastră te va contacta în curând cu o ofertă personalizată.",
    steps: [
      {
        id: "1",
        question: "Care este numele tău?",
        type: "text",
        placeholder: "Introdu numele complet",
        required: true,
        order: 0,
      },
      {
        id: "2",
        question: "Care este adresa ta de email?",
        type: "email",
        placeholder: "exemplu@email.com",
        required: true,
        order: 1,
      },
      {
        id: "3",
        question: "Ce tip de business ai?",
        type: "select",
        placeholder: "Selectează tipul de business",
        required: true,
        order: 2,
        options: ["E-commerce", "Servicii", "Consultanță", "Altele"],
      },
    ],
  })

  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"settings" | "steps">("settings")

  const addStep = () => {
    if (form.steps.length >= MAX_QUESTIONS) {
      alert(`Poți adăuga maxim ${MAX_QUESTIONS} întrebări`)
      return
    }

    const newStep: StepFormField = {
      id: Date.now().toString(),
      question: `Întrebarea ${form.steps.length + 1}`,
      type: "text",
      placeholder: "Introdu răspunsul",
      required: true,
      order: form.steps.length,
    }

    setForm((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }))
  }

  const updateStep = (id: string, updates: Partial<StepFormField>) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => (step.id === id ? { ...step, ...updates } : step)),
    }))
  }

  const deleteStep = (id: string) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }))
    if (selectedStep === id) {
      setSelectedStep(null)
    }
  }

  const saveForm = () => {
    console.log("Salvare formular cu pași:", form)
    alert("Formularul a fost salvat cu succes!")
  }

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Preview Formular cu Pași</h2>
          <Button onClick={() => setShowPreview(false)} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Înapoi la Editor
          </Button>
        </div>
        <StepFormPreview form={form} />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 m-12">
      {/* Sidebar */}
      <div className="xl:col-span-1 space-y-6">
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === "settings" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Setări
          </button>
          <button
            onClick={() => setActiveTab("steps")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === "steps" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Edit3 className="w-4 h-4 inline mr-2" />
            Pași
          </button>
        </div>

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle>Setări Generale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-2">
                <Label className="mb-2" htmlFor="form-title">Titlu Formular</Label>
                <Input
                  id="form-title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Titlul formularului"
                />
              </div>

              <div className="mb-2">
                <Label className="mb-2" htmlFor="form-description">Descriere</Label>
                <Textarea
                  id="form-description"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrierea formularului"
                  rows={2}
                />
              </div>

              <div className="mb-2">
                <Label className="mb-2"  htmlFor="welcome-message">Mesaj de Bun Venit</Label>
                <Textarea
                  id="welcome-message"
                  value={form.welcomeMessage}
                  onChange={(e) => setForm((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
                  placeholder="Mesajul afișat la început"
                  rows={3}
                />
              </div>

              <div className="mb-2">
                <Label className="mb-2" htmlFor="thank-you-message">Mesaj de Mulțumire</Label>
                <Textarea
                  id="thank-you-message"
                  value={form.thankYouMessage}
                  onChange={(e) => setForm((prev) => ({ ...prev, thankYouMessage: e.target.value }))}
                  placeholder="Mesajul afișat la final"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Steps Tab */}
        {activeTab === "steps" && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  Întrebări ({form.steps.length}/{MAX_QUESTIONS})
                </CardTitle>
                <Button onClick={addStep} size="sm" disabled={form.steps.length >= MAX_QUESTIONS}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {form.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedStep === step.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedStep(step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <span className="text-sm font-medium truncate">{step.question}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteStep(step.id)
                      }}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs">
                      {step.type}
                    </Badge>
                    {step.required && (
                      <Badge variant="destructive" className="text-xs ml-1">
                        Obligatoriu
                      </Badge>
                    )}
                  </div>
                </div>
              ))}

              {form.steps.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">Nu ai adăugat încă niciun pas.</p>
                  <Button onClick={addStep} variant="outline" size="sm" className="mt-2 bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Adaugă primul pas
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Field Editor */}
        {selectedStep && (
          <StepFieldEditor
            field={form.steps.find((s) => s.id === selectedStep)!}
            onUpdate={(updates) => updateStep(selectedStep, updates)}
            onClose={() => setSelectedStep(null)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="xl:col-span-3 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Constructor Formular cu Pași</h2>
            <p className="text-gray-600">Creează o experiență interactivă pentru utilizatori</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowPreview(true)} variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Testează
            </Button>
            <Button onClick={saveForm}>
              <Save className="w-4 h-4 mr-2" />
              Salvează
            </Button>
          </div>
        </div>

        {/* Form Overview */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{form.title}</CardTitle>
                <p className="text-gray-600 mt-1">{form.description}</p>
              </div>
              <Badge variant="secondary">
                {form.steps.length} {form.steps.length === 1 ? "pas" : "pași"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress Preview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progres formular</span>
                <span className="text-sm text-gray-500">
                  {form.steps.length > 0 ? `1 din ${form.steps.length}` : "0 din 0"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: form.steps.length > 0 ? `${(1 / form.steps.length) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>

            {/* Steps Overview */}
            <div className="space-y-3">
              {form.steps.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium mb-2">Niciun pas adăugat</p>
                  <p className="text-sm mb-4">Începe prin a adăuga prima întrebare din sidebar</p>
                  <Button onClick={addStep} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Adaugă primul pas
                  </Button>
                </div>
              ) : (
                form.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedStep === step.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedStep(step.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 mb-1">{step.question}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {step.type}
                          </Badge>
                          {step.required && (
                            <Badge variant="destructive" className="text-xs">
                              Obligatoriu
                            </Badge>
                          )}
                          {step.placeholder && <span className="truncate">• {step.placeholder}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
