"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TurbulenceHeatmap() {
  const buoys = ["B001", "B002", "B003", "B004", "B005", "B006"]
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const getTurbulenceData = () => {
    const data: number[][] = []
    for (let i = 0; i < buoys.length; i++) {
      data[i] = []
      for (let j = 0; j < days.length; j++) {
        data[i][j] = Math.random() * 100
      }
    }
    return data
  }

  const turbulenceData = getTurbulenceData()

  const getColor = (value: number) => {
    if (value < 20) return "bg-green-100 dark:bg-green-900"
    if (value < 40) return "bg-yellow-100 dark:bg-yellow-900"
    if (value < 60) return "bg-orange-100 dark:bg-orange-900"
    return "bg-red-100 dark:bg-red-900"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Turbulence & Tilt Heatmap</CardTitle>
        <CardDescription>Movement intensity (0-100%)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-xs font-semibold text-muted-foreground p-2">Buoy</th>
                {days.map((day) => (
                  <th key={day} className="text-xs font-semibold text-muted-foreground p-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buoys.map((buoy, i) => (
                <tr key={buoy}>
                  <td className="text-xs font-medium text-primary p-2">{buoy}</td>
                  {turbulenceData[i]?.map((value, j) => (
                    <td key={j} className={`p-2 ${getColor(value)} rounded`}>
                      <span className="text-xs font-semibold">{Math.round(value)}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
