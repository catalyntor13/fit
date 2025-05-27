"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2 } from 'lucide-react'
import { updateUserEmail } from "@/app/(auth)/action"

interface ChangeEmailFormData {
  newEmail: string
  confirmEmail: string
}

export default function ChangeEmailForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<ChangeEmailFormData>()

  // Watch both email fields to compare them
  const newEmail = watch("newEmail")
  const confirmEmail = watch("confirmEmail")

  const onSubmit = async (data: ChangeEmailFormData) => {
    setLoading(true)
    setMessage(null)

    try {
      // Create FormData object
      const formData = new FormData()
      formData.append('newEmail', data.newEmail)

      // Call the server action
      const result = await updateUserEmail(formData)

      if (result.error) {
        throw new Error(result.error)
      }

      // Success message
      setMessage({
        type: 'success',
        text: result.message || 'Am trimis un email de confirmare la noua adresă.'
      })

      // Reset form
      reset()
      
      // Close dialog after 3 seconds
      setTimeout(() => {
        setIsOpen(false)
        setMessage(null)
      }, 3000)

    } catch (error: any) {
      console.error('Error updating email:', error)
      setMessage({
        type: 'error',
        text: error.message || 'A apărut o eroare la schimbarea email-ului'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Schimba E-mail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Schimba Adresa de Email
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newEmail">Noua Adresă de Email</Label>
            <Input
              id="newEmail"
              type="email"
              placeholder="noua@adresa.com"
              {...register("newEmail", {
                required: "Adresa de email este obligatorie",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Te rugăm să introduci o adresă de email validă"
                }
              })}
            />
            {errors.newEmail && (
              <p className="text-sm text-red-500">{errors.newEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmEmail">Confirmă Noua Adresă de Email</Label>
            <Input
              id="confirmEmail"
              type="email"
              placeholder="noua@adresa.com"
              {...register("confirmEmail", {
                required: "Te rugăm să confirmi adresa de email",
                validate: (value) => 
                  value === newEmail || "Adresele de email nu se potrivesc"
              })}
            />
            {errors.confirmEmail && (
              <p className="text-sm text-red-500">{errors.confirmEmail.message}</p>
            )}
          </div>

          {message && (
            <Alert className={message.type === 'error' ? 'border-red-500' : 'border-green-500'}>
              <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Anulează
            </Button>
            <Button
              type="submit"
              disabled={loading || !newEmail || !confirmEmail || newEmail !== confirmEmail}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Se trimite...' : 'Schimbă Email-ul'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}