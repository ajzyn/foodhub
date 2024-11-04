import { auth } from './auth'

export default async function authMiddleware(request) {
  try {
    return await auth(request)
  } catch (error) {
    console.error('Auth middleware error:', error)
    return null // or handle errors as needed
  }
}
