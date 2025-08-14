import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabaseServer'


export default async function ClientiPage({ 
  searchParams 
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  // Await the searchParams since it's now a Promise in Next.js 15
  const resolvedSearchParams = await searchParams
  
  // Get the cached user
  const user = await getUser()
  
  // Create the Supabase client
  const supabase = await createClient()
  

  return (

    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Clienti</h1>
      <p>Welcome, {user?.email || 'Guest'}!</p>
      <p>Page: {resolvedSearchParams.page || '1'}</p>
      <p>Search: {resolvedSearchParams.search || 'None'}</p>
      {/* Additional content can be added here */}
    </div>
  )
}