"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, RefreshCw } from "lucide-react"
import { mockBuoys } from "@/lib/mock-data"

interface AnalyticsFiltersProps {
  onFilterChange?: (filters: { timePeriod: string; buoyFilter: string }) => void
}

export function AnalyticsFilters({ onFilterChange }: AnalyticsFiltersProps) {
  const [timePeriod, setTimePeriod] = useState("last-7-days")
  const [buoyFilter, setBuoyFilter] = useState("all")

  const handleApplyFilters = () => {
    onFilterChange?.({ timePeriod, buoyFilter })
  }

  const handleReset = () => {
    setTimePeriod("last-7-days")
    setBuoyFilter("all")
    onFilterChange?.({ timePeriod: "last-7-days", buoyFilter: "all" })
  }

  // Extract unique rivers from buoys
  const uniqueRivers = Array.from(new Set(mockBuoys.map((b) => b.river)))

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Time Period</label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-90-days">Last 90 days</option>
              <option value="last-6-months">Last 6 months</option>
              <option value="custom">Custom range</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Select Buoy/River</label>
            <select
              value={buoyFilter}
              onChange={(e) => setBuoyFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Buoys</option>
              {uniqueRivers.map((river) => (
                <option key={river} value={river}>
                  {river}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleApplyFilters} variant="default" className="gap-2">
              <Filter size={18} />
              Apply
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon" title="Reset filters">
              <RefreshCw size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
