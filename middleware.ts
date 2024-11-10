import { NextRequest, NextResponse } from 'next/server'

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
  const pathWithSearchParams = url.pathname + (searchParams ? `?${searchParams}` : '')

  // const authToken = request.cookies.get('session-token')
  // const session = authToken?.value

  console.log('1')
  console.log(customSubdomain, hostname, url.pathname)
  if (customSubdomain === hostname && pathWithSearchParams === '/') {
    console.log('2')
    url.pathname = '/site'
    return NextResponse.rewrite(url)
  }

  if (customSubdomain === 'supplier') {
    console.log('3')
    if (pathWithSearchParams.startsWith(`/${customSubdomain}`)) {
      console.log('4')
      const purePath = pathWithSearchParams.split(`/${customSubdomain}`)[1]

      url.pathname = `/${purePath}`

      return NextResponse.redirect(url)
    }

    url.pathname = `/${customSubdomain}${pathWithSearchParams}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|api/auth|api|trpc|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
