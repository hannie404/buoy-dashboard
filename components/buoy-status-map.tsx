"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BuoyStatusMap() {
  const buoys = [
    { id: "B01", status: "online", signal: 95, level: "Normal" },
    { id: "B02", status: "online", signal: 88, level: "Rising" },
    { id: "B03", status: "online", signal: 92, level: "Normal" },
    { id: "B04", status: "offline", signal: 0, level: "Unknown" },
  ]

  const statusColor = (status: string, level: string) => {
    if (status === "offline") return "bg-gray-200 text-gray-600"
    if (level === "Flood") return "bg-status-critical text-destructive-foreground"
    if (level === "Rising") return "bg-status-warning text-accent-foreground"
    return "bg-status-normal text-white"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Buoy Status</CardTitle>
        <CardDescription>Real-time buoy connectivity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {buoys.map((buoy) => (
          <div key={buoy.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${buoy.status === "online" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <div>
                <p className="text-sm font-medium">{buoy.id}</p>
                <p className="text-xs text-muted-foreground">{buoy.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-semibold px-2 py-1 rounded ${statusColor(buoy.status, buoy.level)}`}>
                {buoy.level}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
