import fetchFromApi from '@/lib/fetch-from-api'
import { UserType } from '@prisma/client'

export async function setUserType(userType: UserType) {
  const response = await fetchFromApi<void>('/auth/user-type', {
    method: 'POST',
    body: JSON.stringify({ userType })
  })

  return response
}
