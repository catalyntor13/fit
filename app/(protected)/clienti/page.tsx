
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabaseServer'
import ClientiPageClient from './clienti-page-client'

// Define the type for your client data
export type Client = {
  id: string
  client_id: string
  client_name: string
  client_email: string
  first_q: string
  second_q: string
  third_q: string
  four_q: string
  five_q: string
  six_q: string
  seven_q: string
  eight_q: string
  nine_q: string
  ten_q: string
  client_phone: string
  created_at?: string
}

interface PageProps {
  searchParams: {
    page?: string
    search?: string
  }
}

export default async function ClientiPage({ searchParams }: PageProps) {
  // Get the cached user
  const user = await getUser()
  
  // Create the Supabase client
  const supabase = await createClient()
  
  // Get pagination parameters
  const currentPage = Number.parseInt(searchParams.page || "1")
  const itemsPerPage = 15
  const offset = (currentPage - 1) * itemsPerPage

  // Get search parameter
  const searchTerm =  searchParams.search || ""

  // Build the query with search and pagination
  let query = supabase
    .from("clienti")
    .select("*", { count: "exact" })
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })

  // Add search filter if search term exists
  if (searchTerm) {
    query = query.or(
      `client_name.ilike.%${searchTerm}%,client_email.ilike.%${searchTerm}%,client_phone.ilike.%${searchTerm}%`
    )
  }

  // Add pagination
  query = query.range(offset, offset + itemsPerPage - 1)

  const { data: clients, error, count } = await query
  
  if (error) {
    console.error("Error fetching clients:", error)
    return (
      <div className="text-red-500">
        Eroare: {error.message || "A apărut o eroare la încărcarea clienților"}
      </div>
    )
  }
  
  // Calculate pagination info
  const totalPages = Math.ceil((count || 0) / itemsPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  // Calculate some stats
  const totalClients = count || 0
  const weightGoals = clients?.reduce((acc, client) => {
    const weight = parseFloat(client.five_q) || 0
    return acc + weight
  }, 0) || 0
  const avgWeight = totalClients > 0 ? Math.round(weightGoals / totalClients) : 0

  return (
    <ClientiPageClient 
      clients={clients as Client[]}
      currentPage={currentPage}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      totalClients={totalClients}
      searchTerm={searchTerm}
      avgWeight={avgWeight}
    />
  )
}