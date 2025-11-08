"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Sheet, BarChart3 } from "lucide-react"
import { mockBuoys, waterLevelTrends, mockAlerts } from "@/lib/mock-data"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export function ExportData() {
  const generatePDF = (timeRange?: string) => {
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.setTextColor(40, 116, 166)
    doc.text("BuoySense Analytics Report", 14, 22)
    
    // Subtitle
    doc.setFontSize(11)
    doc.setTextColor(100)
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    doc.text(`Generated: ${dateStr}`, 14, 30)
    if (timeRange) {
      doc.text(`Time Range: ${timeRange}`, 14, 36)
    }
    
    // Buoy Status Summary
    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text("Buoy Status Summary", 14, 46)
    
    const buoyData = mockBuoys.map(b => [
      b.id,
      b.name,
      b.river,
      b.status,
      `${b.waterLevel}m`,
      `${b.batteryLevel}%`,
      `${b.signalStrength}%`
    ])
    
    autoTable(doc, {
      startY: 50,
      head: [['Buoy ID', 'Name', 'River', 'Status', 'Water Level', 'Battery', 'Signal']],
      body: buoyData,
      headStyles: { fillColor: [40, 116, 166] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
    })
    
    // Alert Summary
    const finalY = (doc as any).lastAutoTable.finalY || 100
    doc.setFontSize(14)
    doc.text("Recent Alerts", 14, finalY + 10)
    
    const alertData = mockAlerts.slice(0, 10).map(a => [
      a.id,
      a.type,
      a.severity,
      a.buoyId,
      new Date(a.timestamp).toLocaleString(),
    ])
    
    autoTable(doc, {
      startY: finalY + 14,
      head: [['Alert ID', 'Type', 'Severity', 'Buoy ID', 'Timestamp']],
      body: alertData,
      headStyles: { fillColor: [40, 116, 166] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
    })
    
    // Statistics
    const statsY = (doc as any).lastAutoTable.finalY || 200
    if (statsY < 250) {
      doc.setFontSize(14)
      doc.text("Statistics", 14, statsY + 10)
      
      doc.setFontSize(10)
      doc.setTextColor(60)
      const activeBuoys = mockBuoys.filter(b => b.status !== "offline").length
      const criticalAlerts = mockAlerts.filter(a => a.severity === "critical").length
      const avgWaterLevel = (mockBuoys.reduce((sum, b) => sum + b.waterLevel, 0) / mockBuoys.length).toFixed(2)
      
      doc.text(`Total Buoys: ${mockBuoys.length}`, 14, statsY + 18)
      doc.text(`Active Buoys: ${activeBuoys}`, 14, statsY + 24)
      doc.text(`Critical Alerts: ${criticalAlerts}`, 14, statsY + 30)
      doc.text(`Average Water Level: ${avgWaterLevel}m`, 14, statsY + 36)
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150)
      doc.text(
        `Page ${i} of ${pageCount}`,
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
    const filename = `buoysense-report-${new Date().getTime()}.pdf`
    doc.save(filename)
  }

  const handleExport = (format: string, timeRange?: string) => {
    // Prepare data based on format
    const data = {
      buoys: mockBuoys,
      waterLevelTrends,
      alerts: mockAlerts,
      exportDate: new Date().toISOString(),
      timeRange: timeRange || "all",
    }

    if (format === "CSV") {
      // Convert to CSV
      const csvHeaders = "Buoy ID,Name,River,Status,Water Level,Battery,Signal,Last Transmission\n"
      const csvRows = mockBuoys
        .map(
          (b) =>
            `${b.id},${b.name},${b.river},${b.status},${b.waterLevel},${b.batteryLevel},${b.signalStrength},${b.lastTransmission}`
        )
        .join("\n")
      const csvContent = csvHeaders + csvRows
      downloadFile(csvContent, "buoy-data.csv", "text/csv")
    } else if (format === "JSON") {
      // Convert to JSON
      const jsonContent = JSON.stringify(data, null, 2)
      downloadFile(jsonContent, "buoy-data.json", "application/json")
    } else if (format === "PDF") {
      // Generate PDF report
      generatePDF(timeRange)
    }
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Export Data</CardTitle>
        <CardDescription>Download analysis reports in your preferred format</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4 gap-2 bg-transparent hover:bg-muted"
            onClick={() => handleExport("CSV")}
          >
            <Sheet size={24} className="text-primary" />
            <span className="font-medium">CSV Export</span>
            <span className="text-xs text-muted-foreground">Raw data spreadsheet</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4 gap-2 bg-transparent hover:bg-muted"
            onClick={() => handleExport("PDF")}
          >
            <FileText size={24} className="text-primary" />
            <span className="font-medium">PDF Report</span>
            <span className="text-xs text-muted-foreground">Formatted analysis report</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4 gap-2 bg-transparent hover:bg-muted"
            onClick={() => handleExport("JSON")}
          >
            <BarChart3 size={24} className="text-primary" />
            <span className="font-medium">JSON Export</span>
            <span className="text-xs text-muted-foreground">Structured data format</span>
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">Quick export options:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="gap-1"
              onClick={() => handleExport("CSV", "last-7-days")}
            >
              <Download size={14} />
              Last 7 Days
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="gap-1"
              onClick={() => handleExport("CSV", "last-30-days")}
            >
              <Download size={14} />
              Last 30 Days
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="gap-1"
              onClick={() => handleExport("JSON", "custom")}
            >
              <Download size={14} />
              Custom Range
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
