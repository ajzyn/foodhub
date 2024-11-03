import { NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((request) => {
  console.log('000000000000000000000000000000000000000000000000')
  const hostname = request.headers.get('host')
  const domain = process.env.NEXT_PUBLIC_DOMAIN

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

  console.log(url)
  if (url.pathname === '/') {
    url.pathname = '/site'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|api/auth|api|trpc|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
