"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Buoy } from "@/lib/mock-data"

interface AddBuoyModalProps {
  onAdd: (buoy: Buoy) => void
}

interface FormData {
  name: string
  id: string
  river: string
  latitude: string
  longitude: string
  battery: string
  loraChannel: string
  status: "normal" | "rising" | "alert" | "offline"
  notes: string
}

interface FormErrors {
  [key: string]: string
}

export function AddBuoyModal({ onAdd }: AddBuoyModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    id: "",
    river: "",
    latitude: "",
    longitude: "",
    battery: "",
    loraChannel: "7",
    status: "normal",
    notes: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = "Buoy name is required"
    if (!formData.id.trim()) newErrors.id = "Buoy ID is required"
    if (!formData.river.trim()) newErrors.river = "River name is required"
    if (!formData.latitude) newErrors.latitude = "Latitude is required"
    else if (isNaN(Number.parseFloat(formData.latitude))) newErrors.latitude = "Latitude must be a number"
    if (!formData.longitude) newErrors.longitude = "Longitude is required"
    else if (isNaN(Number.parseFloat(formData.longitude))) newErrors.longitude = "Longitude must be a number"
    if (!formData.battery) newErrors.battery = "Battery level is required"
    else if (
      isNaN(Number.parseInt(formData.battery)) ||
      Number.parseInt(formData.battery) < 0 ||
      Number.parseInt(formData.battery) > 100
    )
      newErrors.battery = "Battery must be between 0-100%"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (!validateForm()) return

    const newBuoy: Buoy = {
      id: formData.id,
      name: formData.name,
      river: formData.river,
      latitude: Number.parseFloat(formData.latitude),
      longitude: Number.parseFloat(formData.longitude),
      status: formData.status,
      batteryLevel: Number.parseInt(formData.battery),
      signalStrength: 85,
      waterLevel: 2.0,
      temperature: 28.0,
      turbulence: 10,
      tilt: 0,
      lastTransmission: new Date().toISOString(),
      solarCharging: 50,
      loraChannel: Number.parseInt(formData.loraChannel),
      notes: formData.notes,
    }

    onAdd(newBuoy)
    setFormData({
      name: "",
      id: "",
      river: "",
      latitude: "",
      longitude: "",
      battery: "",
      loraChannel: "7",
      status: "normal",
      notes: "",
    })
    setErrors({})
    setSubmitted(false)
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submitted && errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90 gap-2">
        <Plus className="h-4 w-4" />
        Add New Buoy
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Monitoring Buoy</DialogTitle>
            <DialogDescription>Enter the details for the new buoy station. All fields are required.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Buoy Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Buoy Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Pasig River North"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Buoy ID */}
            <div className="space-y-2">
              <Label htmlFor="id" className="text-sm font-medium">
                Buoy ID *
              </Label>
              <Input
                id="id"
                name="id"
                placeholder="e.g., B007"
                value={formData.id}
                onChange={handleChange}
                className={errors.id ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.id && <p className="text-xs text-red-500">{errors.id}</p>}
            </div>

            {/* River */}
            <div className="space-y-2">
              <Label htmlFor="river" className="text-sm font-medium">
                River Name *
              </Label>
              <Input
                id="river"
                name="river"
                placeholder="e.g., Pasig River"
                value={formData.river}
                onChange={handleChange}
                className={errors.river ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.river && <p className="text-xs text-red-500">{errors.river}</p>}
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-sm font-medium">
                  Latitude *
                </Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="0.0001"
                  placeholder="14.6349"
                  value={formData.latitude}
                  onChange={handleChange}
                  className={errors.latitude ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.latitude && <p className="text-xs text-red-500">{errors.latitude}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-sm font-medium">
                  Longitude *
                </Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="0.0001"
                  placeholder="121.5563"
                  value={formData.longitude}
                  onChange={handleChange}
                  className={errors.longitude ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.longitude && <p className="text-xs text-red-500">{errors.longitude}</p>}
              </div>
            </div>

            {/* Battery & LoRa Channel Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="battery" className="text-sm font-medium">
                  Battery % *
                </Label>
                <Input
                  id="battery"
                  name="battery"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="85"
                  value={formData.battery}
                  onChange={handleChange}
                  className={errors.battery ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.battery && <p className="text-xs text-red-500">{errors.battery}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="loraChannel" className="text-sm font-medium">
                  LoRa Channel
                </Label>
                <Select
                  value={formData.loraChannel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, loraChannel: value }))}
                >
                  <SelectTrigger id="loraChannel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Channel 7</SelectItem>
                    <SelectItem value="8">Channel 8</SelectItem>
                    <SelectItem value="9">Channel 9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Initial Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="rising">Rising</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional notes about this buoy..."
                value={formData.notes}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                Add Buoy
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
