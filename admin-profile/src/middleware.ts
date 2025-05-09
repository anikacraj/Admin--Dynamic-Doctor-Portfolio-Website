import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAdminPath = path.startsWith('/adminD') || path.startsWith('/AdminAboutUs')
  
  if (isAdminPath) {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      const loginUrl = new URL('/admin-ayw-login', request.url)
      loginUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/adminD/:path*', '/AdminAboutUs/:path*'],
}