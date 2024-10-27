import { NextResponse } from 'next/server'
import { auth } from './auth'

const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up']

const allowedSubdomains = ['restaurant', 'supplier']

const isPublicRoute = (request: Request) => {
  const url = new URL(request.url)

  return publicRoutes.some((route) => url.pathname === route)
}

export default auth((request) => {
  if (isPublicRoute(request)) {
    const url = new URL(request.url)
    const searchParams = url.searchParams.toString()
    const hostname = request.headers.get('host')

    const pathWithSearchParams = url.pathname + (searchParams ? '?' + searchParams : '')

    const customSubdomain = hostname
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0]
      ?.toLowerCase()
      .slice(0, -1) as string

    if (customSubdomain && allowedSubdomains.includes(customSubdomain)) {
      return NextResponse.rewrite(new URL(`/${customSubdomain}${pathWithSearchParams}`, request.url))
    }

    if (url.pathname === '/' || (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)) {
      return NextResponse.redirect(new URL('/site', request.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
