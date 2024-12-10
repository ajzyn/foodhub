import { NextRequest, NextResponse } from 'next/server'
import { routesConfig } from './lib/routes'

export default async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const url = request.nextUrl.clone()

  if (!domain) {
    console.error('NEXT_PUBLIC_DOMAIN is not defined')
    return NextResponse.next()
  }

  const customSubdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
  const searchParams = url.searchParams.toString()
  const pathname = url.pathname

  if (customSubdomain !== hostname) {
    url.pathname = `/${customSubdomain}${pathname}`
    url.search = searchParams
    const currentRouteConfig = routesConfig.find((route) => url.pathname.startsWith(route.matcher))

    if (currentRouteConfig?.requiredAuth) {
      const session = request.cookies.get('session-token')
      if (!session) {
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}/auth/sign-up?userType=${customSubdomain?.toLocaleUpperCase()}`
        )
      }
    }

    return NextResponse.rewrite(url)
  }

  if (pathname === '/') {
    url.pathname = '/site'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|api/auth|api|trpc|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
