export const getRequestHeaders = async (): Promise<string> => {
  const { headers: nextHeaders } = await import('next/headers')
  const headersList = nextHeaders()
  const cookie = headersList.get('cookie') || ''

  return cookie
}
