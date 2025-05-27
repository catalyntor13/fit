// app/(protected)/layout.tsx
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { createClient } from '@/lib/supabaseServer'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Declare the variable outside the try block
  let fullName = "User";
  
  try {
    // Check if user is authenticated
    const user = await getUser()
    
    if (!user) {
      redirect('/login')
    }
    
    // Fetch user profile from profiles table
    const supabase = await createClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
    
    // Set the full name if available
    if (profile && profile.full_name) {
      fullName = profile.full_name
    } else if (user.email) {
      // Fallback to email username if no full name
      fullName = user.email.split('@')[0]
    }

    
  } catch (error) {
    console.error("Error getting user:", error)
    redirect('/login')
  }
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar fullName={fullName} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col  ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}