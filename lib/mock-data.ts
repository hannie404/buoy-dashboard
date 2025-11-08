// Mock IoT sensor data for BuoySense
export interface Buoy {
  id: string
  name: string
  river: string
  latitude: number
  longitude: number
  status: "normal" | "rising" | "alert" | "offline"
  batteryLevel: number
  signalStrength: number
  waterLevel: number
  temperature: number
  turbulence: number
  tilt: number
  lastTransmission: string
  solarCharging: number
  loraChannel: number
  notes?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "alert" | "system" | "battery"
  timestamp: string
  read: boolean
  buoyId?: string
}

export interface Alert {
  id: string
  buoyId: string
  type: "water_level" | "communication" | "battery" | "tilt"
  severity: "info" | "warning" | "critical"
  message: string
  timestamp: string
  resolved: boolean
}

export const mockBuoys: Buoy[] = [
  {
    id: "B001",
    name: "Pasig River North",
    river: "Pasig River",
    latitude: 14.6349,
    longitude: 121.5563,
    status: "normal",
    batteryLevel: 85,
    signalStrength: 95,
    waterLevel: 2.3,
    temperature: 28.5,
    turbulence: 12,
    tilt: 2,
    lastTransmission: new Date(Date.now() - 5 * 60000).toISOString(),
    solarCharging: 45,
    loraChannel: 7,
    notes: "Operational, stable readings",
  },
  {
    id: "B002",
    name: "Pasig River South",
    river: "Pasig River",
    latitude: 14.5771,
    longitude: 121.5932,
    status: "rising",
    batteryLevel: 72,
    signalStrength: 78,
    waterLevel: 3.1,
    temperature: 29.2,
    turbulence: 18,
    tilt: 3,
    lastTransmission: new Date(Date.now() - 15 * 60000).toISOString(),
    solarCharging: 38,
    loraChannel: 7,
    notes: "Water level rising - monitoring closely",
  },
  {
    id: "B003",
    name: "Laguna de Bay",
    river: "Laguna de Bay",
    latitude: 14.3469,
    longitude: 121.3869,
    status: "normal",
    batteryLevel: 91,
    signalStrength: 88,
    waterLevel: 1.8,
    temperature: 27.8,
    turbulence: 8,
    tilt: 1,
    lastTransmission: new Date(Date.now() - 2 * 60000).toISOString(),
    solarCharging: 52,
    loraChannel: 7,
    notes: "Optimal performance",
  },
  {
    id: "B004",
    name: "Cagayan River",
    river: "Cagayan River",
    latitude: 17.6386,
    longitude: 121.7301,
    status: "offline",
    batteryLevel: 15,
    signalStrength: 0,
    waterLevel: 4.2,
    temperature: 26.1,
    turbulence: 45,
    tilt: 8,
    lastTransmission: new Date(Date.now() - 2 * 3600000).toISOString(),
    solarCharging: 0,
    loraChannel: 8,
    notes: "Communication loss - requires attention",
  },
  {
    id: "B005",
    name: "Marikina River",
    river: "Marikina River",
    latitude: 14.6421,
    longitude: 121.6192,
    status: "alert",
    batteryLevel: 58,
    signalStrength: 82,
    waterLevel: 3.8,
    temperature: 30.1,
    turbulence: 35,
    tilt: 5,
    lastTransmission: new Date(Date.now() - 10 * 60000).toISOString(),
    solarCharging: 28,
    loraChannel: 7,
    notes: "Flood alert level - evacuation recommended",
  },
  {
    id: "B006",
    name: "Angat River",
    river: "Angat River",
    latitude: 14.8,
    longitude: 121.3,
    status: "normal",
    batteryLevel: 88,
    signalStrength: 91,
    waterLevel: 2.5,
    temperature: 28.9,
    turbulence: 14,
    tilt: 2,
    lastTransmission: new Date(Date.now() - 8 * 60000).toISOString(),
    solarCharging: 48,
    loraChannel: 8,
    notes: "Steady readings throughout day",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "N001",
    title: "Critical: Flood Alert",
    message: "Water level on Marikina River (B005) has exceeded critical threshold at 3.8m",
    type: "alert",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    read: false,
    buoyId: "B005",
  },
  {
    id: "N002",
    title: "Warning: Rising Water",
    message: "Pasig River South (B002) water level rising at 3.1m - monitor closely",
    type: "alert",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    read: false,
    buoyId: "B002",
  },
  {
    id: "N003",
    title: "System: New Buoy Added",
    message: "Angat River monitoring station (B006) is now online",
    type: "system",
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    read: true,
  },
  {
    id: "N004",
    title: "Warning: Low Battery",
    message: "Cagayan River buoy (B004) battery critical at 15%",
    type: "battery",
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    read: true,
    buoyId: "B004",
  },
  {
    id: "N005",
    title: "Info: Communication Loss",
    message: "Cagayan River buoy (B004) - no transmission for 2 hours",
    type: "alert",
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    read: true,
    buoyId: "B004",
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "A001",
    buoyId: "B005",
    type: "water_level",
    severity: "critical",
    message: "Water level critical - Flood alert issued",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    resolved: false,
  },
  {
    id: "A002",
    buoyId: "B002",
    type: "water_level",
    severity: "warning",
    message: "Water level rising rapidly",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    resolved: false,
  },
  {
    id: "A003",
    buoyId: "B004",
    type: "communication",
    severity: "warning",
    message: "No transmission for 2 hours",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    resolved: false,
  },
  {
    id: "A004",
    buoyId: "B004",
    type: "battery",
    severity: "critical",
    message: "Battery critically low",
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    resolved: false,
  },
]

export const waterLevelTrends = [
  { time: "00:00", B001: 2.1, B002: 2.9, B003: 1.6, B004: 4.0, B005: 2.8, B006: 2.3 },
  { time: "04:00", B001: 2.2, B002: 3.0, B003: 1.7, B004: 4.1, B005: 3.1, B006: 2.4 },
  { time: "08:00", B001: 2.3, B002: 3.1, B003: 1.8, B004: 4.2, B005: 3.4, B006: 2.5 },
  { time: "12:00", B001: 2.4, B002: 3.3, B003: 1.9, B004: 4.5, B005: 3.8, B006: 2.6 },
  { time: "16:00", B001: 2.2, B002: 3.2, B003: 1.7, B004: 4.3, B005: 3.6, B006: 2.4 },
  { time: "20:00", B001: 2.1, B002: 3.0, B003: 1.6, B004: 4.0, B005: 3.2, B006: 2.3 },
]
