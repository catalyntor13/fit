import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Protected routes that require authentication
    '/welcome/:path*',
    '/clienti/:path*',
    '/formular/:path*',
    '/profile/:path*',
    '/setari/:path*',
    '/checkout/:path*',
    // Add other protected routes here
    
    // Include these basic routes for session handling
    '/login',
    '/register',
  ],
}