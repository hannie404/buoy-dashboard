"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Signal, Battery, Droplets } from "lucide-react"
import { Buoy3DViewer } from "@/components/buoy-3d-viewer"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const sensorData = [
  { time: "00:00", temp: 28.5, humidity: 75, tilt: 2.1 },
  { time: "04:00", temp: 27.8, humidity: 78, tilt: 2.3 },
  { time: "08:00", temp: 29.2, humidity: 72, tilt: 1.9 },
  { time: "12:00", temp: 31.5, humidity: 65, tilt: 1.5 },
  { time: "16:00", temp: 30.8, humidity: 68, tilt: 1.8 },
  { time: "20:00", temp: 29.1, humidity: 74, tilt: 2.2 },
  { time: "24:00", temp: 28.3, humidity: 77, tilt: 2.0 },
]

const waterLevelData = [
  { time: "00:00", level: 1.8 },
  { time: "04:00", level: 1.95 },
  { time: "08:00", level: 2.1 },
  { time: "12:00", level: 2.35 },
  { time: "16:00", level: 2.3 },
  { time: "20:00", level: 2.15 },
  { time: "24:00", level: 2.0 },
]

const communicationLogs = [
  { time: "14:32", type: "Data Transmission", status: "Success", message: "Water level data received" },
  { time: "14:27", type: "Battery Alert", status: "Warning", message: "Battery level below 80%" },
  { time: "14:22", type: "Data Transmission", status: "Success", message: "Sensor readings updated" },
  { time: "14:17", type: "Signal Loss", status: "Resolved", message: "Connection restored" },
  { time: "14:12", type: "Data Transmission", status: "Success", message: "All sensors operational" },
]

interface BuoyProfileProps {
  buoyId: string
}

export function BuoyProfile({ buoyId }: BuoyProfileProps) {
  const handleDownloadReport = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(22)
    doc.setTextColor(40, 116, 166)
    doc.text(`Buoy ${buoyId} - Detailed Report`, 14, 22)
    
    // Date and basic info
    doc.setFontSize(10)
    doc.setTextColor(100)
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    doc.text(`Generated: ${dateStr}`, 14, 30)
    
    // Status Overview
    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text("Current Status", 14, 42)
    
    const statusData = [
      ['Status', 'Online'],
      ['Signal Strength', '92% - Excellent'],
      ['Battery Level', '72% - Good condition'],
      ['Current Water Level', '2.3m - Within normal range'],
      ['Last Update', '2 minutes ago']
    ]
    
    autoTable(doc, {
      startY: 46,
      body: statusData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [100, 100, 100], cellWidth: 60 },
        1: { textColor: [40, 40, 40] }
      },
      margin: { left: 14 }
    })
    
    // Specifications
    let currentY = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text("Technical Specifications", 14, currentY)
    
    const specsData = [
      ['Location', 'Pasig Bridge'],
      ['River', 'Pasig River'],
      ['Buoy ID', buoyId],
      ['Ultrasonic Sensor', 'HC-SR04'],
      ['Tilt Sensor', 'MPU-6050'],
      ['Communication', 'LoRa 915MHz'],
      ['Solar Panel', '5W Panel'],
      ['Battery', '3.7V LiPo']
    ]
    
    autoTable(doc, {
      startY: currentY + 4,
      body: specsData,
      theme: 'striped',
      headStyles: { fillColor: [40, 116, 166] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60 },
      },
      margin: { left: 14, right: 14 }
    })
    
    // Water Level Data (24h)
    currentY = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text("Water Level Data (24h)", 14, currentY)
    
    const waterLevelTableData = waterLevelData.map(d => [d.time, `${d.level}m`])
    
    autoTable(doc, {
      startY: currentY + 4,
      head: [['Time', 'Water Level']],
      body: waterLevelTableData,
      headStyles: { fillColor: [40, 116, 166] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: { fontSize: 9, halign: 'center' },
      margin: { left: 14, right: 14 }
    })
    
    // Environmental Sensor Data
    currentY = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text("Environmental Sensor Readings (24h)", 14, currentY)
    
    const sensorTableData = sensorData.map(d => [
      d.time, 
      `${d.temp}°C`, 
      `${d.humidity}%`, 
      `${d.tilt}°`
    ])
    
    autoTable(doc, {
      startY: currentY + 4,
      head: [['Time', 'Temperature', 'Humidity', 'Tilt']],
      body: sensorTableData,
      headStyles: { fillColor: [40, 116, 166] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: { fontSize: 9, halign: 'center' },
      margin: { left: 14, right: 14 }
    })
    
    // Communication Logs - New page if needed
    currentY = (doc as any).lastAutoTable.finalY + 10
    if (currentY > 240) {
      doc.addPage()
      currentY = 20
    }
    
    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text("Communication Log", 14, currentY)
    
    const logTableData = communicationLogs.map(log => [
      log.time,
      log.type,
      log.status,
      log.message
    ])
    
    autoTable(doc, {
      startY: currentY + 4,
      head: [['Time', 'Type', 'Status', 'Message']],
      body: logTableData,
      headStyles: { fillColor: [40, 116, 166] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 35 },
        2: { cellWidth: 25 },
        3: { cellWidth: 'auto' }
      },
      margin: { left: 14, right: 14 }
    })
    
    // Footer on all pages
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150)
      doc.text(
        `Buoy ${buoyId} Report - Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      )
      doc.text(
        'BuoySense Flood Monitoring System',
        14,
        doc.internal.pageSize.getHeight() - 10
      )
    }
    
    // Save the PDF
    const filename = `buoy-${buoyId}-report-${new Date().getTime()}.pdf`
    doc.save(filename)
  }

  return (
    <div className="space-y-6">
      {/* 3D Model Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Buoy3DViewer 
            title="3D Model" 
            description="Interactive buoy visualization"
          />
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-primary">Buoy Specifications</CardTitle>
              <CardDescription>Technical details and sensor configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">Pasig Bridge</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">River</p>
                  <p className="font-medium">Pasig River</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Buoy ID</p>
                  <p className="font-medium">{buoyId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ultrasonic Sensor</p>
                  <p className="font-medium">HC-SR04</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tilt Sensor</p>
                  <p className="font-medium">MPU-6050</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Communication</p>
                  <p className="font-medium">LoRa 915MHz</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Solar Panel</p>
                  <p className="font-medium">5W Panel</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Battery</p>
                  <p className="font-medium">3.7V LiPo</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Update</p>
                  <p className="font-medium">2 minutes ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-2xl font-bold text-foreground">Online</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Signal className="text-primary mt-1" size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Signal Strength</p>
                <p className="text-2xl font-bold text-foreground">92%</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Battery className="text-yellow-600 mt-1" size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Battery Level</p>
                <p className="text-2xl font-bold text-foreground">72%</p>
                <p className="text-xs text-yellow-600">Good condition</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Droplets className="text-primary mt-1" size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-2xl font-bold text-foreground">2.3m</p>
                <p className="text-xs text-green-600">Within normal range</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Water Level (24h)</CardTitle>
            <CardDescription>Continuous monitoring data</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={waterLevelData}>
                <defs>
                  <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#colorLevel)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Environmental Sensors</CardTitle>
            <CardDescription>Temperature & humidity readings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="var(--color-accent)" strokeWidth={2} name="Temp (°C)" />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="var(--color-secondary)"
                  strokeWidth={2}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Communication Log</CardTitle>
          <CardDescription>Recent buoy activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {communicationLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-4 pb-3 border-b border-border last:border-0">
                <div className="text-xs text-muted-foreground font-mono pt-1">{log.time}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{log.type}</p>
                    <Badge
                      variant={
                        log.status === "Success" ? "default" : log.status === "Warning" ? "outline" : "secondary"
                      }
                      className="text-xs"
                    >
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Edit Configuration</Button>
        <Button onClick={handleDownloadReport}>Download Report</Button>
      </div>
    </div>
  )
}
