import { NextRequest, NextResponse } from 'next/server'
import { getUserBySessionToken } from './server/db/auth'

export default async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const url = request.nextUrl.clone()

  const user = await getUserBySessionToken()
  console.log('user', user)

  if (!domain) {
    console.error('NEXT_PUBLIC_DOMAIN is not defined')
    return NextResponse.next()
  }

  const customSubdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
  const searchParams = url.searchParams.toString()
  const pathWithSearchParams = url.pathname + (searchParams ? `?${searchParams}` : '')

  if (customSubdomain && customSubdomain === hostname) {
    if (pathWithSearchParams === '/') {
      url.pathname = '/site'
      return NextResponse.rewrite(url)
    }

    return NextResponse.next()
  }

  if (pathWithSearchParams.startsWith(`/${customSubdomain}`)) {
    const purePath = pathWithSearchParams.split(`/${customSubdomain}`)[1]

    url.pathname = `/${purePath}`

    return NextResponse.redirect(url)
  }

  url.pathname = `/${customSubdomain}${pathWithSearchParams}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!_next|api/auth|api|trpc|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
