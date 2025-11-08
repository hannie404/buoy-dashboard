"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Zap, Radio, Trash2 } from "lucide-react"

interface Alert {
  id: string
  type: "water_level" | "battery" | "signal" | "offline"
  buoy: string
  message: string
  severity: "critical" | "warning" | "info"
  timestamp: string
  resolved: boolean
}

const alertsData: Alert[] = [
  {
    id: "1",
    type: "water_level",
    buoy: "B002",
    message: "Water level rising rapidly at Laguna Junction",
    severity: "critical",
    timestamp: "2 minutes ago",
    resolved: false,
  },
  {
    id: "2",
    type: "battery",
    buoy: "B002",
    message: "Battery level below 75%",
    severity: "warning",
    timestamp: "15 minutes ago",
    resolved: false,
  },
  {
    id: "3",
    type: "signal",
    buoy: "B006",
    message: "Signal strength degrading",
    severity: "warning",
    timestamp: "32 minutes ago",
    resolved: false,
  },
  {
    id: "4",
    type: "offline",
    buoy: "B004",
    message: "Lumut Island buoy offline",
    severity: "critical",
    timestamp: "4 hours ago",
    resolved: false,
  },
  {
    id: "5",
    type: "water_level",
    buoy: "B001",
    message: "Water level returned to normal",
    severity: "info",
    timestamp: "1 hour ago",
    resolved: true,
  },
]

export function AlertsList() {
  const getIcon = (type: string) => {
    switch (type) {
      case "water_level":
        return <AlertTriangle size={18} />
      case "battery":
        return <Zap size={18} />
      case "signal":
        return <Radio size={18} />
      case "offline":
        return <AlertCircle size={18} />
      default:
        return <AlertCircle size={18} />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Active Alerts</CardTitle>
        <CardDescription>{alertsData.filter((a) => !a.resolved).length} unresolved alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alertsData.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-4 p-4 rounded-lg border ${
                alert.resolved
                  ? "bg-muted/50 border-border opacity-60"
                  : "bg-card border-border hover:border-primary/50"
              } transition-all`}
            >
              <div
                className={`text-${alert.severity === "critical" ? "red" : alert.severity === "warning" ? "yellow" : "blue"}-600 flex-shrink-0 mt-0.5`}
              >
                {getIcon(alert.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="font-medium text-foreground">{alert.message}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {alert.buoy} • {alert.timestamp}
                    </p>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Badge>
                </div>
              </div>

              {!alert.resolved && (
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
