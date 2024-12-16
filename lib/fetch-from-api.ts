import { getRequestHeaders } from './get-request-cookies'

export default async function fetchFromApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = typeof window === 'undefined' ? process.env.NEXTAUTH_URL + '/api' : '/api'

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>)
  } as Record<string, string>

  if (typeof window === 'undefined' && !options.next) {
    headers.cookie = await getRequestHeaders()
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers,
      credentials: 'include'
    })

    const contentType = response.headers.get('content-type')

    let data
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || data || 'An error occurred',
        details: data?.error || null
      }
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw {
        status: 500,
        message: error.message || 'Network error',
        details: null
      }
    }

    throw error
  }
}
