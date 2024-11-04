import { NextResponse } from 'next/server'
import authMiddleware from './auth-middleware'

export default async function middleware(request) {
  // Call auth middleware to handle authentication
  const authResponse = await authMiddleware(request)
  if (authResponse) {
    return authResponse
  }

  const hostname = request.headers.get('host')
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const url = request.nextUrl.clone()

  console.log('Incoming request for:', hostname, 'Path:', url.pathname)

  if (!domain) {
    console.error('NEXT_PUBLIC_DOMAIN is not defined')
    return NextResponse.next()
  }

  if (url.pathname.startsWith('/auth/')) {
    console.log('Auth path detected, bypassing rewrite:', url.pathname)
    return NextResponse.next()
  }

  if (hostname === domain) {
    console.log('Redirecting main domain to /site')
    url.pathname = '/site'
    return NextResponse.rewrite(url)
  }

  const subdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
  console.log('Subdomain detected:', subdomain)

  if (subdomain === 'supplier') {
    console.log('Rewriting supplier subdomain to /supplier')
    url.pathname = '/supplier'
    return NextResponse.rewrite(url)
  }

  console.log('No rewrite or redirect needed, continuing with the original request')
  return NextResponse.next()
}

// export default auth((request) => {
//   const hostname = request.headers.get('host')
//   const domain = process.env.NEXT_PUBLIC_DOMAIN

// console.log('sessionToken cookie:', request.cookies.get('session-token'))
// const domain = process.env.NEXT_PUBLIC_DOMAIN

// if (!domain) {
//   console.error('NEXT_PUBLIC_DOMAIN is not defined')
//   return NextResponse.next()
// }

// const customSubdomain = hostname?.split(`.${domain}`)[0]?.toLowerCase()
// const url = request.nextUrl.clone()
// const searchParams = url.searchParams.toString()

// const pathWithSearchParams = url.pathname + (searchParams ? `?${searchParams}` : '')

// // console.log('przed custom subdomain')
// if (customSubdomain !== hostname) {
//   // console.log('custom subdomain')
//   if (pathWithSearchParams.startsWith(`/${customSubdomain}`)) {
//     // console.log('w ifie')
//     const purePath = pathWithSearchParams.split(`/${customSubdomain}`)[1]

//     url.pathname = `/${purePath}`

//     return NextResponse.redirect(url)
//   }
//   // console.log('za ifem w custom subdomain')

//   url.pathname = `/${customSubdomain}${pathWithSearchParams}`
//   console.log(url)
//   // console.log(url)
//   return NextResponse.rewrite(url)
// }

// if (url.pathname === '/') {
//   // console.log('w /')
//   url.pathname = '/site'
//   return NextResponse.rewrite(url)
// }

// console.log('next()')
//   return NextResponse.next()
// })

export const config = {
  matcher: [
    '/((?!_next|api/auth|api|trpc|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
