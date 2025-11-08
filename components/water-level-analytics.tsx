"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from "recharts"

const monthlyData = [
  { month: "Jan", avg: 1.8, max: 3.2, min: 0.9 },
  { month: "Feb", avg: 1.9, max: 3.5, min: 1.0 },
  { month: "Mar", avg: 2.1, max: 3.8, min: 1.1 },
  { month: "Apr", avg: 2.3, max: 4.2, min: 1.3 },
  { month: "May", avg: 2.5, max: 4.8, min: 1.5 },
  { month: "Jun", avg: 2.7, max: 5.1, min: 1.6 },
  { month: "Jul", avg: 2.6, max: 4.9, min: 1.5 },
  { month: "Aug", avg: 2.4, max: 4.5, min: 1.4 },
]

export function WaterLevelAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Water Level Trends</CardTitle>
        <CardDescription>Monthly average, max, and min levels</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="max" fill="var(--color-destructive)" name="Max Level" opacity={0.6} />
            <Bar dataKey="min" fill="var(--color-secondary)" name="Min Level" opacity={0.6} />
            <Line type="monotone" dataKey="avg" stroke="var(--color-primary)" strokeWidth={2} name="Average" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
