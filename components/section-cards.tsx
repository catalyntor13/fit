// components/section-cards.tsx
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  totalClients: number
  newClients: number
}

export function SectionCards({ totalClients, newClients }: SectionCardsProps) {
  // Calculate percentage change for new clients
  // Assuming new clients are from the last 30 days
  // and we're comparing to the previous 30 days
  const percentageChange = totalClients > 0 
    ? Math.round((newClients / totalClients) * 100) 
    : 0
  
  // Determine if trending up or down
  const isTrendingUp = percentageChange > 0
  
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 m-2 ">
      <Card className="@container/card ">
        <CardHeader>
          <CardDescription>Total Clienti</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalClients}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {isTrendingUp ? <IconTrendingUp /> : <IconTrendingDown />}
              {isTrendingUp ? '+' : ''}{percentageChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isTrendingUp 
              ? `Trending up this month ${<IconTrendingUp className="size-4" />}` 
              : `Trending down this month ${<IconTrendingDown className="size-4" />}`
            }
          </div>
          <div className="text-muted-foreground">
            Clienti in ultimele 30 zile
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Clienti Noi</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {newClients}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {isTrendingUp ? <IconTrendingUp /> : <IconTrendingDown />}
              {isTrendingUp ? '+' : ''}{percentageChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isTrendingUp 
              ? `Up ${percentageChange}% this period` 
              : `Down ${Math.abs(percentageChange)}% this period`
            }
            {isTrendingUp 
              ? <IconTrendingUp className="size-4" /> 
              : <IconTrendingDown className="size-4" />
            }
          </div>
          <div className="text-muted-foreground">
            Clienti noi in ultimele 30 zile
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}