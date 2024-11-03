import { NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((request) => {
  console.log('middleware')
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

  console.log('przed custom subdomain')
  if (customSubdomain !== hostname) {
    console.log('custom subdomain')
    if (pathWithSearchParams.startsWith(`/${customSubdomain}`)) {
      console.log('w ifie')
      const purePath = pathWithSearchParams.split(`/${customSubdomain}`)[1]

      url.pathname = `/${purePath}`

      return NextResponse.redirect(url)
    }
    console.log('za ifem w custom subdomain')

    url.pathname = `/${customSubdomain}${pathWithSearchParams}`
    console.log(url)
    return NextResponse.rewrite(url)
  }

  if (url.pathname === '/') {
    console.log('w /')
    url.pathname = '/site'
    return NextResponse.rewrite(url)
  }

  console.log('next()')
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|api/auth|api|trpc|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
