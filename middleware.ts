import { NextResponse } from 'next/server'
import { auth } from './auth'

const allowedSubdomains = ['restaurant', 'supplier']

export default auth((request) => {
  // if (process.env.NODE_ENV === 'development') {
  //   const url = new URL(request.url)

  //   if (url.pathname === '/' || (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)) {
  //     return NextResponse.rewrite(new URL('/site', request.url))
  //   }

  //   return NextResponse.next()
  // }

  const hostname = request.headers.get('host')
  const customSubdomain = hostname
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0]
    ?.toLowerCase()
    .slice(0, -1) as string

  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  const pathWithSearchParams = url.pathname + (searchParams ? '?' + searchParams : '')

  const isDomainAllowed = allowedSubdomains.includes(customSubdomain)

  if (customSubdomain && isDomainAllowed) {
    return NextResponse.rewrite(new URL(`/${customSubdomain}${pathWithSearchParams}`, request.url))
  }

  if (url.pathname === '/') {
    return NextResponse.rewrite(new URL('/site', request.url))
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
