import { createClient } from '@/lib/supabaseServer'
import { cache } from 'react'
import { redirect } from 'next/navigation'

// Use React's cache function to memoize the result
export const getUser = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data.user) {
    redirect('/login?UserNotAuthenticated')
  }
  
  return data.user
})