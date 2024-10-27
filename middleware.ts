import { auth } from '@/auth'
import { NextResponse } from 'next/server'

const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up']

const isPublicRoute = (request: Request) => {
  const url = new URL(request.url)
  return publicRoutes.some((route) => {
    if (route.endsWith('(.*)')) {
      return url.pathname.startsWith(route.slice(0, -4))
    }
    return url.pathname === route
  })
}

export default auth((request: any) => {
  if (!isPublicRoute(request)) {
    const url = request.nextUrl
    const searchParams = url.searchParams.toString()
    const hostname = request.headers.get('host')

    const pathWithSearchParams = url.pathname + (searchParams ? '?' + searchParams : '')

    const customSubdomain = hostname?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0]

    if (customSubdomain) {
      return NextResponse.rewrite(new URL(`/${customSubdomain}${pathWithSearchParams}`, request.url))
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
      return NextResponse.redirect(new URL(`/agency/sign-in`, request.url))
    }

    if (url.pathname === '/' || (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)) {
      return NextResponse.redirect(new URL('/site', request.url))
    }

    if (url.pathname.startsWith('/agency') || url.pathname.startsWith('/subaccount')) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, request.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
