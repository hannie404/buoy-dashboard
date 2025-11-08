export interface User {
  id: string
  email: string
  role: "admin" | "operator"
  name: string
}

export const rolePermissions = {
  admin: {
    viewDashboard: true,
    viewBuoys: true,
    editBuoys: true,
    deleteBuoys: true,
    viewAnalytics: true,
    exportData: true,
    viewAlerts: true,
    manageUsers: true,
    editSettings: true,
  },
  operator: {
    viewDashboard: true,
    viewBuoys: true,
    editBuoys: false,
    deleteBuoys: false,
    viewAnalytics: true,
    exportData: true,
    viewAlerts: true,
    manageUsers: false,
    editSettings: false,
  },
}

export function checkPermission(role: string, permission: keyof typeof rolePermissions.admin): boolean {
  const permissions = rolePermissions[role as keyof typeof rolePermissions]
  return permissions?.[permission] ?? false
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("authToken")
  const role = localStorage.getItem("userRole") as "admin" | "operator"

  if (!token) return null

  return {
    id: token,
    email: role === "admin" ? "admin@buoysense.com" : "operator@buoysense.com",
    role: role || "operator",
    name: role === "admin" ? "Admin User" : "Operator User",
  }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
  }
}
