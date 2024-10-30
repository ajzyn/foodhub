import { NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((request) => {
  const hostname = request.headers.get('host')
  const domain = process.env.NEXT_PUBLIC_DOMAIN

  if (!domain) {
    console.error('NEXT_PUBLIC_DOMAIN is not defined')
    return NextResponse.next()
  }

  const customSubdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  const pathWithSearchParams = url.pathname + (searchParams ? `?${searchParams}` : '')

  if (customSubdomain && !url.pathname.startsWith(`/${customSubdomain}`)) {
    const segments = url.pathname.split('/').filter(Boolean)

    if (!segments.length || segments[0] !== customSubdomain) {
      // Tylko wtedy dodaj prefix subdomeny
      return NextResponse.rewrite(new URL(`/${customSubdomain}${pathWithSearchParams}`, request.url))
    }
  }

  if (url.pathname === '/') {
    return NextResponse.rewrite(new URL('/site', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Wyklucz Next.js internals, statyczne pliki, oraz już przekierowane subdomeny
    '/((?!_next|api|trpc|supplier|restaurant|site|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Zawsze uruchamiaj dla innych API routes
    '/(api|trpc)(.*)'
  ]
}
