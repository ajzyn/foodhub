import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import { publicRoutes } from './lib/route-config'

export default async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const session = await auth()

  if (!publicRoutes.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!domain) {
    console.error('NEXT_PUBLIC_DOMAIN is not defined')
    return NextResponse.next()
  }

  const customSubdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
  const url = request.nextUrl.clone()
  const searchParams = url.searchParams.toString()
  const pathWithSearchParams = url.pathname + (searchParams ? `?${searchParams}` : '')

  if (customSubdomain !== hostname) {
    if (pathWithSearchParams.startsWith(`/${customSubdomain}`)) {
      const purePath = pathWithSearchParams.split(`/${customSubdomain}`)[1]
      url.pathname = `/${purePath}`
      return NextResponse.redirect(url)
    }
    url.pathname = `/${customSubdomain}${pathWithSearchParams}`
    return NextResponse.rewrite(url)
  }

  if (url.pathname === '/') {
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
