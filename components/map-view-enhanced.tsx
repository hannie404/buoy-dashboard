"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Map, { Marker, Popup, NavigationControl, GeolocateControl, ScaleControl } from "react-map-gl"
import { Button } from "@/components/ui/button"
import { ChevronRight, MapPin, Thermometer, Droplets } from "lucide-react"
import { mockBuoys, type Buoy } from "@/lib/mock-data"
import "mapbox-gl/dist/mapbox-gl.css"

interface MapViewProps {
  onBuoySelect?: (buoyId: string) => void
}

interface WeatherData {
  temp: number
  description: string
  humidity: number
  windSpeed: number
}

export function MapView({ onBuoySelect }: MapViewProps) {
  const router = useRouter()
  const { theme } = useTheme()
  const [selectedBuoy, setSelectedBuoy] = useState<Buoy | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [mounted, setMounted] = useState(false)

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
  const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ""

  const [viewState, setViewState] = useState({
    longitude: 121.0,
    latitude: 14.5,
    zoom: 8,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch weather data for a location
  const fetchWeather = useCallback(
    async (lat: number, lon: number) => {
      if (!WEATHER_API_KEY || WEATHER_API_KEY === "your_api_key_here") {
        // Mock weather data if no API key
        setWeather({
          temp: 28 + Math.random() * 4,
          description: "Partly Cloudy",
          humidity: 65 + Math.random() * 20,
          windSpeed: 10 + Math.random() * 5,
        })
        return
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
        )
        const data = await response.json()
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        })
      } catch (error) {
        console.error("Error fetching weather:", error)
      }
    },
    [WEATHER_API_KEY]
  )

  const handleMarkerClick = useCallback(
    (buoy: Buoy) => {
      setSelectedBuoy(buoy)
      onBuoySelect?.(buoy.id)
      fetchWeather(buoy.latitude, buoy.longitude)
      setViewState({
        longitude: buoy.longitude,
        latitude: buoy.latitude,
        zoom: 12,
      })
    },
    [onBuoySelect, fetchWeather]
  )

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "normal":
        return "#10b981" // green
      case "rising":
        return "#f59e0b" // yellow
      case "alert":
        return "#ef4444" // red
      case "offline":
        return "#6b7280" // gray
      default:
        return "#3b82f6" // blue
    }
  }

  if (!mounted) {
    return <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
  }

  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg p-8">
        <div className="text-center max-w-md space-y-4">
          <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground">Mapbox Token Required</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>To display the interactive map, you need to add your Mapbox access token:</p>
            <ol className="text-left list-decimal list-inside space-y-1">
              <li>
                Go to{" "}
                <a
                  href="https://account.mapbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Mapbox Account
                </a>
              </li>
              <li>Sign up for a free account (if needed)</li>
              <li>Copy your default public token</li>
              <li>
                Add it to <code className="bg-muted px-1 rounded">.env.local</code> file:
              </li>
            </ol>
            <pre className="bg-slate-900 text-green-400 p-3 rounded text-xs text-left overflow-x-auto">
              NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
            </pre>
            <p className="pt-2">Then restart the development server.</p>
          </div>
        </div>
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Map Controls */}
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />
        <ScaleControl />

        {/* Buoy Markers */}
        {mockBuoys.map((buoy) => (
          <Marker
            key={buoy.id}
            longitude={buoy.longitude}
            latitude={buoy.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              handleMarkerClick(buoy)
            }}
          >
            <div className="cursor-pointer transform hover:scale-110 transition-transform">
              <div
                className="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: getMarkerColor(buoy.status) }}
              >
                <Droplets className="w-4 h-4 text-white" />
              </div>
              {buoy.status === "alert" && (
                <div className="absolute inset-0 w-8 h-8 rounded-full animate-ping" style={{ backgroundColor: getMarkerColor(buoy.status), opacity: 0.4 }} />
              )}
            </div>
          </Marker>
        ))}

        {/* Selected Buoy Popup */}
        {selectedBuoy && (
          <Popup
            longitude={selectedBuoy.longitude}
            latitude={selectedBuoy.latitude}
            anchor="top"
            onClose={() => setSelectedBuoy(null)}
            closeButton={true}
            closeOnClick={false}
            className="map-popup w-[350px]"
          >
            <div className="p-2 min-w-auto">
              <h3 className="font-bold text-lg mb-1 dark:text-gray-800">{selectedBuoy.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{selectedBuoy.river}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Water Level:</span>
                  <span className="font-semibold dark:text-gray-800">{selectedBuoy.waterLevel}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Battery:</span>
                  <span className="font-semibold dark:text-gray-800">{selectedBuoy.batteryLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Signal:</span>
                  <span className="font-semibold dark:text-gray-800">{selectedBuoy.signalStrength}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={`font-semibold ${selectedBuoy.status === "alert" ? "text-red-600" : selectedBuoy.status === "rising" ? "text-yellow-600" : "text-green-600"}`}
                  >
                    {selectedBuoy.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {weather && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold dark:text-gray-800">Local Weather</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className="dark:text-gray-800">{weather.temp.toFixed(1)}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="capitalize dark:text-gray-800">{weather.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Humidity:</span>
                      <span className=" dark:text-gray-800">{weather.humidity.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={() => router.push(`/buoys/${selectedBuoy.id}`)}
                className="w-full mt-3 h-9 text-sm gap-1"
                size="sm"
              >
                View Full Details <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Popup>
        )}
      </Map>

      {/* Legend - Floating Bottom Left */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg z-10">
        <p className="font-semibold text-foreground mb-2 text-sm">Status Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-muted-foreground">Rising</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 relative">
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75"></div>
            </div>
            <span className="text-xs text-muted-foreground">Flood Alert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-xs text-muted-foreground">Offline</span>
          </div>
        </div>
      </div>
    </div>
  )
}
