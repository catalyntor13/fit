"use client"

import { useState } from "react"
import { Copy } from 'lucide-react'
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormularLinkGeneratorProps {
  userId: string
}

export default function FormularLink({ userId }: FormularLinkGeneratorProps) {
  const [shareableLink, setShareableLink] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Generate link function
  const generateShareableLink = () => {
    const link = `${window.location.origin}/survey?id=${userId}`
    console.log("Generated link:", link)
    setShareableLink(link)
    setDialogOpen(true)
  }

  // Copy to clipboard function
  const copyToClipboard = () => {
    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch(err => console.error("Copy failed:", err))
    }
  }

  return (
    <>
      <Button 
        variant="default" 
        onClick={generateShareableLink}
      >
        Generate Survey Link
      </Button>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Survey Link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to access your survey.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input 
                id="link" 
                value={shareableLink} 
                readOnly 
              />
          
            </div>
            <Button 
              type="button" 
              size="sm" 
              className="px-5 cursor-pointer"
              onClick={copyToClipboard}
              disabled={!shareableLink}
            >
              <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-green-600">Link copied to clipboard!</p>
          )}

        
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}