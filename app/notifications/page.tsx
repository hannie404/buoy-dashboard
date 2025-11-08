"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle, AlertCircle, Info, Zap } from "lucide-react"
import { mockNotifications, type Notification } from "@/lib/mock-data"

export default function NotificationsPage() {
  const router = useRouter()
  const user = getCurrentUser()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [router, user])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "battery":
        return <Zap className="h-5 w-5 text-yellow-500" />
      case "system":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
      case "battery":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
      case "system":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
      default:
        return "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-400"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                {notifications.filter((n) => !n.read).length} unread message
                {notifications.filter((n) => !n.read).length !== 1 ? "s" : ""}
              </p>
            </div>
            {notifications.filter((n) => !n.read).length > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                Mark All Read
              </Button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="gap-2"
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className="gap-2"
            >
              Unread ({notifications.filter((n) => !n.read).length})
            </Button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border ${
                    !notification.read ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-border"
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 pt-1">{getNotificationIcon(notification.type)}</div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p
                              className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={`text-xs capitalize ${getTypeColor(notification.type)}`}>
                                {notification.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(notification.timestamp).toLocaleString([], {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Status & Actions */}
                          <div className="flex flex-col items-end gap-2">
                            {!notification.read && <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-md border-border">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">All caught up!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filter === "unread" ? "No unread notifications" : "No notifications yet"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
