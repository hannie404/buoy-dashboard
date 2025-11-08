"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, User, Network, Bell, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"

interface SettingsPanelProps {
  user: any
}

export function SettingsPanel({ user }: SettingsPanelProps) {
  const router = useRouter()
  const [loraFreq, setLoraFreq] = useState("868")
  const [loraBaud, setLoraBaud] = useState("115200")

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
        <TabsTrigger value="notifications">Alerts</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">System Version</p>
                <p className="text-lg font-semibold">1.2.4</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Database</p>
                <p className="text-lg font-semibold">Active</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">API Status</p>
                <p className="text-lg font-semibold text-green-600">Online</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Backup</p>
                <p className="text-lg font-semibold">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="network" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Network size={20} />
              LoRa Configuration
            </CardTitle>
            <CardDescription>Configure IoT sensor communication parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">LoRa Frequency (MHz)</label>
              <input
                type="text"
                value={loraFreq}
                onChange={(e) => setLoraFreq(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">Default: 868 MHz (EU), 915 MHz (US)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Baud Rate</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground">
                <option>9600</option>
                <option>19200</option>
                <option selected>115200</option>
              </select>
            </div>

            <Button className="w-full">Save Network Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">API Keys</CardTitle>
            <CardDescription>Manage IoT data source integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-foreground">IoT Gateway API</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Regenerate
                </Button>
              </div>
              <code className="text-sm font-mono text-foreground bg-background px-3 py-2 rounded block">
                sk_prod_••••••••••••••••
              </code>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Bell size={20} />
              Alert Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Water Level Alerts</p>
                <p className="text-sm text-muted-foreground">Notify when levels exceed threshold</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Battery Warnings</p>
                <p className="text-sm text-muted-foreground">Alert when battery is low</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Offline Notifications</p>
                <p className="text-sm text-muted-foreground">Alert when buoy goes offline</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <Button className="w-full">Save Alert Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <User size={20} />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Name</p>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>

            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Lock size={20} />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
            />
            <Button className="w-full">Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <LogOut size={20} />
              Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full gap-2" onClick={handleLogout}>
              <LogOut size={18} />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
