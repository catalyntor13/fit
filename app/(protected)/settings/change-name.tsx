// app/(protected)/settings/user-profile-edit-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { updateUserProfile } from "@/app/(auth)/action";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";

// Define the form schema with zod
const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfileEditFormProps {
  initialProfile: {
    full_name?: string;
    // Add other profile fields as needed
  };
}

export default function UserProfileEditForm({ initialProfile }: UserProfileEditFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialProfile?.full_name || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Create FormData to pass to the server action
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      
      const result = await updateUserProfile(formData);
      
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccessMessage("Profile updated successfully");
        
        // Force a refresh to show the updated data
        router.refresh();
      }
    } catch (err: unknown) {
      console.error("Error updating profile:", err);
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.fullName.message}
              </p>
            )}
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
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
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}