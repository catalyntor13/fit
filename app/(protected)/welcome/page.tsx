// app/(protected)/welcome/page.tsx
import { getUser } from "@/lib/auth"
import { createClient } from "@/lib/supabaseServer"
import ClientDashboard from "./client-dashboard"

// Define types directly in this file
interface Client {
  id: string | number
  client_id: string
  client_name: string
  client_email: string
  client_phone: string
  created_at: string
  first_q?: string
  second_q?: string
  third_q?: string
  four_q?: string
  five_q?: string
  six_q?: string
  seven_q?: string
  eight_q?: string
  nine_q?: string
  ten_q?: string
}

interface ChartDataPoint {
  date: string
  clients: number
}


export default async function WelcomePage() {
  // Get the cached user
  const user = await getUser()

  // Create the Supabase client
  const supabase = await createClient()

  // Fetch all clients for this user
  const { data: allClients, error: clientsError } = await supabase.from("clienti").select("*").eq("client_id", user.id)

  if (clientsError) {
    console.error("Error fetching clients:", clientsError)
    return <div>Error loading client data</div>
  }

  // Get current date for calculations
  const currentDate = new Date()

  // Calculate dates for different periods
  const thirtyDaysAgo = new Date(currentDate)
  thirtyDaysAgo.setDate(currentDate.getDate() - 30)

  const sevenDaysAgo = new Date(currentDate)
  sevenDaysAgo.setDate(currentDate.getDate() - 7)

  const ninetyDaysAgo = new Date(currentDate)
  ninetyDaysAgo.setDate(currentDate.getDate() - 90)

  // Calculate new clients (last 30 days)
  const newClients = (allClients as Client[]).filter((client: Client) => {
    const clientDate = new Date(client.created_at)
    return clientDate >= thirtyDaysAgo
  })

  // Prepare chart data
  const chartData = prepareChartData(allClients as Client[])

  // Pass data to client component
  return <ClientDashboard totalClients={allClients.length} newClients={newClients.length} chartData={chartData} />
}

// Helper function to prepare chart data
function prepareChartData(clients: Client[]): ChartDataPoint[] {
  // Create a map to store clients by date
  const clientsByDate = new Map<string, number>()

  // Get the date 90 days ago
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

  // Initialize the map with all dates in the last 90 days
  for (let i = 0; i < 90; i++) {
    const date = new Date(ninetyDaysAgo)
    date.setDate(ninetyDaysAgo.getDate() + i)
    const dateString = date.toISOString().split("T")[0]
    clientsByDate.set(dateString, 0)
  }

  // Count clients by date
  clients.forEach((client: Client) => {
    if (!client.created_at) return

    const dateString = new Date(client.created_at).toISOString().split("T")[0]
    if (clientsByDate.has(dateString)) {
      clientsByDate.set(dateString, clientsByDate.get(dateString)! + 1)
    }
  })

  // Convert map to array for the chart
  const chartData: ChartDataPoint[] = Array.from(clientsByDate.entries()).map(([date, count]) => ({
    date,
    clients: count,
  }))

  // Sort by date
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return chartData
}