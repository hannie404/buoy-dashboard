import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value
  const pathname = request.nextUrl.pathname

  // Allow access to login page without token
  if (pathname === "/login") {
    return NextResponse.next()
  }

  // Redirect to login if no token and trying to access protected routes
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
