import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'

export default async function middleware(request: NextRequest) {
  console.log(request.cookies.get('session-token')?.value)
  const session = await auth()
  console.log('pizda')
  console.log(session)
  const hostname = request.headers.get('host')
  const domain = process.env.NEXT_PUBLIC_DOMAIN

  // Clone the URL to manipulate the path
  const url = request.nextUrl.clone()

  console.log('Incoming request for:', hostname, 'Path:', url.pathname)

  // Check if the domain variable is set correctly
  if (!domain) {
    console.error('NEXT_PUBLIC_DOMAIN is not defined')
    return NextResponse.next()
  }

  // Handle auth paths separately
  if (url.pathname.startsWith('/auth/')) {
    console.log('Auth path detected, bypassing rewrite:', url.pathname)
    return NextResponse.next()
  }

  // Redirect main domain to /site
  if (hostname === domain) {
    console.log('Redirecting main domain to /site')
    url.pathname = '/site'
    return NextResponse.rewrite(url)
  }

  // Rewrite subdomain to specific path
  const subdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
  console.log('Subdomain detected:', subdomain)

  if (subdomain === 'supplier') {
    console.log('Rewriting supplier subdomain to /supplier')
    url.pathname = '/supplier'
    return NextResponse.rewrite(url)
  }

  // Continue with the original request if no conditions are met
  console.log('No rewrite or redirect needed, continuing with the original request')
  return NextResponse.next()
}

// export d auth((request) => {
//   const hostname = request.headers.get('host')
//   const domain = process.env.NEXT_PUBLIC_DOMAIN

//   if (!domain) {
//     console.error('NEXT_PUBLIC_DOMAIN is not defined')
//     return NextResponse.next()
//   }

//   const customSubdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
//   const url = request.nextUrl.clone()
//   const searchParams = url.searchParams.toString()

//   const pathWithSearchParams = url.pathname + (searchParams ? `?${searchParams}` : '')

//   if (customSubdomain !== hostname) {
//     if (pathWithSearchParams.startsWith(`/${customSubdomain}`)) {
//       const purePath = pathWithSearchParams.split(`/${customSubdomain}`)[1]

//       url.pathname = `/${purePath}`

//       return NextResponse.redirect(url)
//     }

//     url.pathname = `/${customSubdomain}${pathWithSearchParams}`
//     return NextResponse.rewrite(url)
//   }

//   if (url.pathname === '/') {
//     url.pathname = '/site'
//     return NextResponse.rewrite(url)
//   }

//   return NextResponse.next()
// })

export const config = {
  matcher: [
    '/((?!_next|api/auth|api|trpc|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
