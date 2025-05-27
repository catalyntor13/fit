import { createClient } from '@/lib/supabaseServer'
import { cache } from 'react'

// Use React's cache function to memoize the result
export const getUser = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error) {
    throw new Error('Authentication error')
  }
  
  return data.user
})