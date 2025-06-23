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
    const user = await getUser()

    const supabase = await createClient()

    const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("subscription_status, full_name")
    .eq("id", user.id)
    .single()
    
    if (profileError || !profile) {
    console.error('Eroare profil:', profileError)
    redirect('/error') 
  }

  if (profile.subscription_status !== 'active') {
    redirect('/payment') 
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
      <AppSidebar fullName={profile.full_name} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col  ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}