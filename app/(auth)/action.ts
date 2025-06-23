'use server'

import { revalidatePath } from 'next/cache';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer';
import { getErrorMessage } from '@/lib/utils';

// Login Function
export async function login(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  
  if (error) {
    // Return the error to be handled by the client
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/welcome');
}

// Register Function
export async function signup(formData: FormData) {
  const supabase = await createClient();
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const full_name = formData.get('full_name') as string;
  
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/(auth)/confirm/account-confirm`,
      data: {
        full_name,
      },
    },
  });
  
  if (error) {
    return { error: error.message };
  }
  
  // Create profile if user was created
  if (authData?.user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        full_name,
        email: authData.user.email,
        subscription_status: "inactive",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    
    if (profileError) {
      return { error: profileError.message };
    }
  }

  return { success: true, email };
}

// Register Function

// Resend e-mail confirmation again function
export async function resendVerificationEmail(email: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/confirm`,
    },
  });
  
  if (error) {
    return { error: error.message };
  }
  
  return { success: true };
}

// Logout function
export async function logout() {
  const supabase = await createClient();
  
  // Sign out the user
  await supabase.auth.signOut();
  
  // Clear cache and redirect
  revalidatePath('/', 'layout');
  redirect('/login?logout=success');
}

// Forgot Password Function
export async function forgotPassword(formData: FormData) {
  try {
    const supabase = await createClient()

    // Extract email with proper null checks
    const email = formData.get("email")

    if (!email || typeof email !== "string") {
      return { error: "Email is required" }
    }

    const trimmedEmail = email.trim()

    if (trimmedEmail.length === 0) {
      return { error: "Email cannot be empty" }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return { error: "Please enter a valid email address" }
    }

    // Send password reset email - let Supabase use the configured URL
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail)

    if (error) {
      console.error("Password reset error:", error)
      return { error: "Failed to send reset email. Please try again." }
    }

    return {
      success: true,
      message: "Password reset email sent! Please check your inbox.",
    }
  } catch (error:unknown) {

     return { error: getErrorMessage(error) };
  }
}

// Change Password Function
export async function changePassword(formData: FormData) {
  try {
    const supabase = await createClient()

    // Extract form data with proper null checks
    const password = formData.get("password")
    const newPassword = formData.get("newPassword")

    // Validate that both fields exist and are strings
    if (!password || typeof password !== "string") {
      return { error: "Current password is required" }
    }

    if (!newPassword || typeof newPassword !== "string") {
      return { error: "New password is required" }
    }

    // Trim the values safely
    const trimmedPassword = password.trim()
    const trimmedNewPassword = newPassword.trim()

    // Additional validation
    if (trimmedPassword.length === 0) {
      return { error: "Current password cannot be empty" }
    }

    if (trimmedNewPassword.length < 6) {
      return { error: "New password must be at least 6 characters long" }
    }

    // Use getUser() to get the current user
    const user = await getUser()

    if (!user?.email) {
      return { error: "User not found" }
    }

    // First verify the current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: trimmedPassword,
    })

    if (signInError) {
      return { error: "Current password is incorrect" }
    }

    // Then update to the new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: trimmedNewPassword,
    })

    if (updateError) {
      return { error: updateError.message }
    }

    return { success: true, message: "Password updated successfully" }
  } catch (error: unknown) {
   
     return { error: getErrorMessage(error) };
  }
}

// New action to fetch user profile data
export async function getUserProfile() {
  try {
    const supabase = await createClient();
    
    // Use getUser() to get the current user
    const user = await getUser();
    
    // Fetch user profile data from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (profileError) {
      throw profileError;
    }

    // Calculate days until subscription expiration
    let daysUntilExpiration = null;
    if (profile?.subscription_expires_at) {
      const expirationDate = new Date(profile.subscription_expires_at);
      const today = new Date();
      const diffTime = expirationDate.getTime() - today.getTime();
      daysUntilExpiration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      daysUntilExpiration = daysUntilExpiration > 0 ? daysUntilExpiration : 0;
    }
    
    return { 
      user: {
        email: user.email
      },
      profile,
      daysUntilExpiration
    };
  } catch (error: unknown) {
   
     return { error: getErrorMessage(error) };
  }
}

// Update User Profile function
export async function updateUserProfile(formData: FormData) {
  try {
    const supabase = await createClient();
    
    // Use getUser() to get the current user
    const user = await getUser();
    
    // Extract form data
    const fullName = formData.get('fullName') as string;

    // Update the user in auth
    const { error: authUpdateError } = await supabase.auth.updateUser({
      data: { 
        full_name: fullName
      }
    });

    if (authUpdateError) {
      throw authUpdateError;
    }
    
    // Update the profile in Supabase
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select();
    
    if (error) {
      throw error;
    }
    
    // Revalidate the settings page to reflect the changes
    revalidatePath('/settings');
    
    // Return success with the updated data
    return { 
      success: true,
      message: "Profile updated successfully",
      data
    };
  } catch (error: unknown) {

     return { error: getErrorMessage(error) };
  }
}

export async function updateUserEmail(formData: FormData) {
  try {
    const supabase = await createClient();
    
    // Use getUser() to get the current user
    const user = await getUser();
    
    // Extract form data with null check
    const newEmail = formData.get('newEmail');
    
    // Add validation for null/undefined
    if (!newEmail || typeof newEmail !== 'string') {
      throw new Error("Email este obligatoriu");
    }

    // Now safely trim
    const trimmedEmail = newEmail.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error("Te rugăm să introduci o adresă de email validă");
    }

    // Check if the new email is different from current email
    if (user.email === trimmedEmail) {
      throw new Error("Noua adresă de email este identică cu cea curentă");
    }

    // Update the user email in auth
    const { error: authUpdateError } = await supabase.auth.updateUser({
      email: trimmedEmail
    });

    if (authUpdateError) {
      throw authUpdateError;
    }
    
    // Revalidate the settings page
    revalidatePath('/settings');
    
    // Return success
    return { 
      success: true,
      message: "Am trimis un email de confirmare la noua adresă. Te rugăm să verifici inbox-ul și să confirmi schimbarea."
    };
  } catch (error: unknown) { 
    return { error: getErrorMessage(error) };
  }
}