"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { mockBuoys } from "@/lib/mock-data"

interface MapViewProps {
  onBuoySelect?: (buoyId: string) => void
}

export function MapView({ onBuoySelect }: MapViewProps) {
  const router = useRouter()
  const { theme } = useTheme()
  const [hoveredBuoy, setHoveredBuoy] = useState<string | null>(null)
  const [selectedBuoy, setSelectedBuoy] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500 ring-green-300 dark:ring-green-700"
      case "rising":
        return "bg-yellow-500 ring-yellow-300 dark:ring-yellow-700"
      case "alert":
        return "bg-red-500 ring-red-300 dark:ring-red-700"
      case "offline":
        return "bg-gray-400 ring-gray-300 dark:ring-gray-600"
      default:
        return "bg-blue-500 ring-blue-300 dark:ring-blue-700"
    }
  }

  const calculatePosition = (lat: number, lng: number) => {
    const minLat = 14.0
    const maxLat = 17.7
    const minLng = 120.5
    const maxLng = 121.8

    const left = ((lng - minLng) / (maxLng - minLng)) * 100
    const top = ((maxLat - lat) / (maxLat - minLat)) * 100

    return { left: `${Math.max(0, Math.min(100, left))}%`, top: `${Math.max(0, Math.min(100, top))}%` }
  }

  const isDark = theme === "dark"

  return (
    <div
      className={`relative w-full h-full rounded-lg overflow-hidden border border-border ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-blue-50 to-blue-100"}`}
    >
      {/* Grid Background */}
      <svg
        className={`absolute inset-0 w-full h-full ${isDark ? "opacity-10" : "opacity-5"}`}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Legend - Top Right */}
      <div
        className={`absolute top-4 right-4 z-20 border border-border rounded-lg p-3 shadow-lg ${isDark ? "bg-slate-800" : "bg-white"}`}
      >
        <p className="font-semibold text-foreground mb-2 text-sm">Status Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Rising</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Flood Alert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
            <span className="text-xs text-muted-foreground">Offline</span>
          </div>
        </div>
      </div>

      {/* Map Markers */}
      <div className="relative w-full h-full">
        {mockBuoys.map((buoy) => {
          const pos = calculatePosition(buoy.latitude, buoy.longitude)
          const isHovered = hoveredBuoy === buoy.id
          const isSelected = selectedBuoy === buoy.id

          return (
            <div key={buoy.id}>
              {/* Marker Button */}
              <button
                onClick={() => {
                  setSelectedBuoy(buoy.id)
                  onBuoySelect?.(buoy.id)
                }}
                onMouseEnter={() => setHoveredBuoy(buoy.id)}
                onMouseLeave={() => setHoveredBuoy(null)}
                style={{ left: pos.left, top: pos.top }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-10 ${
                  isHovered || isSelected ? "scale-125" : "scale-100"
                }`}
                title={`${buoy.name} - ${buoy.status}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ring-4 ${getMarkerColor(buoy.status)}`}
                />
              </button>

              {/* Hover Tooltip */}
              {isHovered && !isSelected && (
                <div
                  style={{ left: pos.left, top: `calc(${pos.top} - 100px)` }}
                  className={`absolute transform -translate-x-1/2 rounded-lg shadow-lg px-3 py-2 text-xs z-20 whitespace-nowrap border border-border ${
                    isDark ? "bg-slate-800" : "bg-white"
                  }`}
                >
                  <p className="font-semibold text-foreground">{buoy.name}</p>
                  <p className="text-muted-foreground">{buoy.id}</p>
                  <p className="text-primary font-medium">{buoy.waterLevel}m</p>
                </div>
              )}

              {/* Selected Popup with Details and Navigation */}
              {isSelected && (
                <div
                  style={{ left: pos.left, top: `calc(${pos.top} - 160px)` }}
                  className={`absolute transform -translate-x-1/2 rounded-lg shadow-lg px-4 py-3 text-xs z-20 border border-border w-48 ${
                    isDark ? "bg-slate-800" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => setSelectedBuoy(null)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                  <p className="font-semibold text-foreground mb-1">{buoy.name}</p>
                  <p className="text-muted-foreground mb-2">{buoy.river}</p>

                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Water Level:</span>
                      <span className="font-medium text-foreground">{buoy.waterLevel}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery:</span>
                      <span className="font-medium text-foreground">{buoy.batteryLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Signal:</span>
                      <span className="font-medium text-foreground">{buoy.signalStrength}%</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push(`/buoys/${buoy.id}`)}
                    className="w-full h-8 text-xs bg-primary hover:bg-primary/90 gap-1"
                  >
                    View Details <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Map Controls - Bottom Left */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-20">
        <button
          className={`w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors ${
            isDark ? "bg-slate-800" : "bg-white"
          }`}
          title="Zoom in"
        >
          <span className="text-lg font-bold text-foreground">+</span>
        </button>
        <button
          className={`w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors ${
            isDark ? "bg-slate-800" : "bg-white"
          }`}
          title="Zoom out"
        >
          <span className="text-lg font-bold text-foreground">−</span>
        </button>
      </div>
    </div>
  )
}
