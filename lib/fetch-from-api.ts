import { ApiResponse } from '@/types/response'

export default async function fetchFromApi<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = typeof window === 'undefined' ? process.env.NEXTAUTH_URL + '/api' : '/api'

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options?.headers as Record<string, string>)
  } as Record<string, string>

  if (typeof window === 'undefined') {
    const { headers: nextHeaders } = await import('next/headers')
    const headersList = nextHeaders()
    const cookie = headersList.get('cookie')

    if (cookie) {
      headers.cookie = cookie || ''
    }
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
    credentials: 'include'
  })

  const data = await response.json()

  if (!response.ok || response.status >= 400) {
    throw new Error(data.error)
  }

  return data
}
