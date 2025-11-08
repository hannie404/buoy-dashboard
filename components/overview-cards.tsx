"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Activity, Radio, AlertTriangle } from "lucide-react"

interface StatCard {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  trend?: string
  color: "blue" | "aqua" | "green" | "yellow"
}

const stats: StatCard[] = [
  {
    title: "Active Buoys",
    value: "24",
    subtitle: "of 25 online",
    icon: <Activity size={24} />,
    trend: "+1 this week",
    color: "blue",
  },
  {
    title: "Rivers Monitored",
    value: "8",
    subtitle: "All regions",
    icon: <Radio size={24} />,
    color: "aqua",
  },
  {
    title: "Avg Water Level",
    value: "2.4m",
    subtitle: "Normal range",
    icon: <TrendingUp size={24} />,
    trend: "↑ 0.3m this week",
    color: "green",
  },
  {
    title: "Active Alerts",
    value: "2",
    subtitle: "in last 24hrs",
    icon: <AlertTriangle size={24} />,
    trend: "Both resolved",
    color: "yellow",
  },
]

const colorClasses = {
  blue: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
  aqua: "bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300",
  green: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300",
  yellow: "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
}

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>{stat.icon}</div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            {stat.subtitle && <p className="text-xs text-muted-foreground mb-1">{stat.subtitle}</p>}
            {stat.trend && <p className="text-xs text-primary font-medium">{stat.trend}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
