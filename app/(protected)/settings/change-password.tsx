
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { changePassword } from "@/app/(auth)/action";
import { getErrorMessage } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define the form schema with zod
const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords don't match",
    path: ["confirmNewPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setGeneralError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // Create FormData to pass to the server action
      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("newPassword", data.newPassword);

      const result = await changePassword(formData);

      if (result?.error) {
        setGeneralError(result.error);
      } else if (result?.success) {
        setSuccessMessage(result.message);
        reset({ password: "", newPassword: "", confirmNewPassword: "" });
      }
    } catch (error: unknown) {
      setGeneralError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   

    <Dialog>
  
    <DialogTrigger>
      <Button variant='default' className="cursor-pointer">Schimba Parola</Button>
    </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Schimba Parola</DialogTitle>
      <DialogDescription>
        Update your password to keep your account secure
      </DialogDescription>
    </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Parola Actuala</Label>
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

          <div className="space-y-2">
            <Label htmlFor="newPassword">Noua Parola</Label>
            <Input
              id="newPassword"
              type="password"
              className={errors.newPassword ? "border-red-500" : ""}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm Parola Noua</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              className={errors.confirmNewPassword ? "border-red-500" : ""}
              {...register("confirmNewPassword")}
            />
            {errors.confirmNewPassword && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          {generalError && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {generalError}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 text-green-500 p-3 rounded-md flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {successMessage}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
  </DialogContent>
</Dialog>
      
 
  );
}