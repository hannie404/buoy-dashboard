"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const alertsOverTime = [
  { day: "Mon", critical: 2, warning: 5, info: 8 },
  { day: "Tue", critical: 1, warning: 3, info: 6 },
  { day: "Wed", critical: 3, warning: 7, info: 12 },
  { day: "Thu", critical: 2, warning: 4, info: 9 },
  { day: "Fri", critical: 4, warning: 6, info: 10 },
  { day: "Sat", critical: 1, warning: 2, info: 4 },
  { day: "Sun", critical: 0, warning: 1, info: 2 },
]

export function AlertsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Alert Trends</CardTitle>
        <CardDescription>Weekly alert distribution by severity</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={alertsOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="critical" fill="var(--color-destructive)" name="Critical" />
            <Bar dataKey="warning" fill="var(--color-accent)" name="Warning" />
            <Bar dataKey="info" fill="var(--color-secondary)" name="Info" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
