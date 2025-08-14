export type FieldType = "text" | "email" | "number" | "textarea" | "select" | "radio" | "checkbox"

export interface StepFormField {    // Structura unei Întrebări
  id: string   // ID unic pentru fiecare întrebare
  question: string
  type: FieldType
  placeholder: string
  required: boolean
  order: number

  // Proprietăți opționale pentru diferite tipuri de câmpuri
  options?: string[] // For select, radio, checkbox
  maxLength?: number // For text
  rows?: number // For textarea
  min?: number // For number
  max?: number // For number
}

export interface StepForm {    //- Formularul Complet
  id: string     // ID unic al formularului
  title: string
  description: string
  welcomeMessage: string
  thankYouMessage: string
  steps: StepFormField[]
  createdAt?: Date
  updatedAt?: Date
}

export interface FormSubmission {   // - Răspunsurile Utilizatorului
  id: string
  formId: string
  data: Record<string, string | string[]>
  submittedAt: Date
  ipAddress?: string
  userAgent?: string
}
