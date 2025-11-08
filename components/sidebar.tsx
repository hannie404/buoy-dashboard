"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Waves, BarChart3, AlertCircle, MapPin, Settings, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { getCurrentUser } from "@/lib/auth"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const menuItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Buoys", href: "/buoys", icon: Waves },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Alerts", href: "/alerts", icon: AlertCircle },
    { label: "Map View", href: "/map", icon: MapPin },
    { label: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-muted rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={cn(
          "w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 flex flex-col h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-6 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Waves className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-sidebar-primary">BuoySense</h1>
          </div>
          {/* <p className="text-xs text-sidebar-foreground/60">Flood Monitoring System</p> */}
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {user && (
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sidebar-accent/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate capitalize">{user.role}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
