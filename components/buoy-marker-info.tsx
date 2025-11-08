"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Signal, Battery, AlertTriangle, MapPin } from "lucide-react"

interface BuoyMarkerInfoProps {
  buoyId: string
}

export function BuoyMarkerInfo({ buoyId }: BuoyMarkerInfoProps) {
  const router = useRouter()
  
  const buoyData: Record<string, any> = {
    B001: {
      name: "Pasig Bridge",
      river: "Pasig River",
      status: "online",
      signal: 95,
      battery: 87,
      waterLevel: 2.3,
      lastUpdate: "2 min ago",
      lat: 14.5897,
      lng: 121.0289,
      alerts: [],
    },
    B002: {
      name: "Laguna Junction",
      river: "Laguna Lake",
      status: "online",
      signal: 88,
      battery: 72,
      waterLevel: 2.8,
      lastUpdate: "5 min ago",
      lat: 14.3175,
      lng: 121.2583,
      alerts: ["Water level rising"],
    },
    B003: {
      name: "Cabanatuan North",
      river: "Pampanga River",
      status: "online",
      signal: 92,
      battery: 95,
      waterLevel: 1.8,
      lastUpdate: "1 min ago",
      lat: 15.4857,
      lng: 120.973,
      alerts: [],
    },
  }

  const data = buoyData[buoyId] || buoyData.B001

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-foreground">{data.name}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin size={14} />
          {data.river}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="col-span-2">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Current Level</p>
                <p className="text-2xl font-bold text-foreground">{data.waterLevel}m</p>
              </div>
              <Badge
                className={
                  data.waterLevel > 2.5
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
                    : "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                }
              >
                {data.waterLevel > 2.5 ? "Rising" : "Normal"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Signal className="text-primary" size={16} />
              <p className="text-xs text-muted-foreground">Signal</p>
            </div>
            <p className="text-lg font-semibold text-foreground">{data.signal}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="text-yellow-600" size={16} />
              <p className="text-xs text-muted-foreground">Battery</p>
            </div>
            <p className="text-lg font-semibold text-foreground">{data.battery}%</p>
          </CardContent>
        </Card>
      </div>

      {data.alerts.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950">
          <CardContent className="pt-4">
            <div className="space-y-2">
              {data.alerts.map((alert: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">{alert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-muted-foreground pt-2 border-t border-border">Last updated: {data.lastUpdate}</div>

      <Button className="w-full" onClick={() => router.push(`/buoys/${buoyId}`)}>
        View Full Details
      </Button>
    </div>
  )
}
