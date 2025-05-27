import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabaseServer'
import SettingsClient from '@/app/(protected)/settings/settings-client'

export default async function SettingsPage() {
  // Get the cached user
  const user = await getUser()
  
  // Fetch additional profile data if needed
  const supabase = await createClient()
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) {
    console.error("Error fetching profile:", error)
    return <div className="text-red-500">Error loading profile data</div>
  }
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <SettingsClient user={user} profile={profile} />
      </div>
    </div>
  )
}