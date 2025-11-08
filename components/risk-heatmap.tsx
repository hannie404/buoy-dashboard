"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RiskHeatmap() {
  const rivers = [
    "Pasig River",
    "Laguna Lake",
    "Pampanga River",
    "Marikina River",
    "Magdalo River",
    "Zapote River",
    "Cabanatuan",
    "Lumut Island",
  ]
  const regions = ["Manila", "Laguna", "Rizal", "Bulacan", "Cavite", "Quezon"]

  const getRiskLevel = () => {
    const data: number[][] = []
    for (let i = 0; i < rivers.length; i++) {
      data[i] = []
      for (let j = 0; j < regions.length; j++) {
        data[i][j] = Math.random() * 100
      }
    }
    return data
  }

  const riskData = getRiskLevel()

  const getRiskColor = (value: number) => {
    if (value < 30) return "bg-green-500"
    if (value < 60) return "bg-yellow-500"
    if (value < 80) return "bg-orange-500"
    return "bg-red-500"
  }

  const getRiskLabel = (value: number) => {
    if (value < 30) return "Low"
    if (value < 60) return "Medium"
    if (value < 80) return "High"
    return "Critical"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Flood Risk Levels by Region</CardTitle>
        <CardDescription>Heat map showing risk assessment across monitored areas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="text-xs font-semibold text-muted-foreground p-2">Location</th>
                {regions.map((region) => (
                  <th key={region} className="text-xs font-semibold text-muted-foreground p-2">
                    {region}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rivers.map((river, i) => (
                <tr key={river}>
                  <td className="text-xs font-medium text-primary p-2 text-left">{river}</td>
                  {riskData[i]?.map((value, j) => (
                    <td key={j} className="p-2">
                      <div className={`${getRiskColor(value)} rounded px-2 py-1 text-white text-xs font-semibold`}>
                        {getRiskLabel(value)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span>Low Risk {"(<30%)"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span>Medium Risk {"(30-60%)"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span>High Risk {"(60-80%)"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span>Critical {"(>80%)"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
