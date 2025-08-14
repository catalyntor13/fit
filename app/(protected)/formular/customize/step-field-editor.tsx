"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Trash2 } from "lucide-react"
import type { StepFormField, FieldType } from "@/lib/StepFormTypes"

interface StepFieldEditorProps {
  field: StepFormField
  onUpdate: (updates: Partial<StepFormField>) => void
  onClose: () => void
}

export default function StepFieldEditor({ field, onUpdate, onClose }: StepFieldEditorProps) {
  const [options, setOptions] = useState<string[]>(field.options || [])

  const fieldTypes: { value: FieldType; label: string }[] = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "number", label: "Număr" },
    { value: "textarea", label: "Text lung" },
    { value: "select", label: "Selecție" },
    { value: "radio", label: "Opțiuni radio" },
    { value: "checkbox", label: "Checkbox multiplu" },
  ]

  const addOption = () => {
    const newOptions = [...options, `Opțiunea ${options.length + 1}`]
    setOptions(newOptions)
    onUpdate({ options: newOptions })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
    onUpdate({ options: newOptions })
  }

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
    onUpdate({ options: newOptions })
  }

  const handleTypeChange = (newType: FieldType) => {
    const updates: Partial<StepFormField> = { type: newType }

    // Reset specific properties when changing type
    if (newType !== "select" && newType !== "radio" && newType !== "checkbox") {
      updates.options = undefined
    }
    if (newType !== "textarea") {
      updates.rows = undefined
    }
    if (newType !== "text") {
      updates.maxLength = undefined
    }

    onUpdate(updates)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Editează Întrebarea</CardTitle>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="field-question">Întrebarea</Label>
          <Textarea
            id="field-question"
            value={field.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            placeholder="Care este întrebarea ta?"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="field-type">Tipul câmpului</Label>
          <Select value={field.type} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fieldTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="field-placeholder">Placeholder / Indiciu</Label>
          <Input
            id="field-placeholder"
            value={field.placeholder}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            placeholder="Text de ajutor pentru utilizator"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="field-required"
            checked={field.required}
            onCheckedChange={(checked) => onUpdate({ required: checked })}
          />
          <Label htmlFor="field-required">Răspuns obligatoriu</Label>
        </div>

        {field.type === "textarea" && (
          <div>
            <Label htmlFor="field-rows">Numărul de rânduri</Label>
            <Input
              id="field-rows"
              type="number"
              value={field.rows || 3}
              onChange={(e) => onUpdate({ rows: Number.parseInt(e.target.value) })}
              min="2"
              max="8"
            />
          </div>
        )}

        {field.type === "text" && (
          <div>
            <Label htmlFor="field-maxlength">Lungime maximă (opțional)</Label>
            <Input
              id="field-maxlength"
              type="number"
              value={field.maxLength || ""}
              onChange={(e) => onUpdate({ maxLength: e.target.value ? Number.parseInt(e.target.value) : undefined })}
              placeholder="Ex: 100"
            />
          </div>
        )}

        {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
          <div>
            <Label>Opțiuni disponibile</Label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Opțiunea ${index + 1}`}
                  />
                  <Button size="sm" variant="ghost" onClick={() => removeOption(index)} disabled={options.length <= 1}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button onClick={addOption} variant="outline" size="sm" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Adaugă opțiune
              </Button>
            </div>
          </div>
        )}

        {field.type === "number" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="field-min">Valoare minimă</Label>
              <Input
                id="field-min"
                type="number"
                value={field.min || ""}
                onChange={(e) => onUpdate({ min: e.target.value ? Number.parseInt(e.target.value) : undefined })}
                placeholder="Min"
              />
            </div>
            <div>
              <Label htmlFor="field-max">Valoare maximă</Label>
              <Input
                id="field-max"
                type="number"
                value={field.max || ""}
                onChange={(e) => onUpdate({ max: e.target.value ? Number.parseInt(e.target.value) : undefined })}
                placeholder="Max"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
