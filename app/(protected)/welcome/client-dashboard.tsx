"use client"

import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

// Define the chart data point interface here
interface ChartDataPoint {
  date: string
  clients: number
}

interface ClientDashboardProps {
  totalClients: number
  newClients: number
  chartData: ChartDataPoint[]
}

export default function ClientDashboard({ totalClients, newClients, chartData }: ClientDashboardProps) {
  return (
    <>
      <SectionCards totalClients={totalClients} newClients={newClients} />
      <ChartAreaInteractive data={chartData} />
    </>
  )
}