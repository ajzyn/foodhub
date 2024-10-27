import { setUserType } from '@/server/db/user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId, userType } = await request.json()

  if (!userId || !userType) {
    return NextResponse.json({ error: 'Missing userId or userType' }, { status: 400 })
  }

  try {
    await setUserType(userId, userType)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting user type:', error)
    return NextResponse.json({ error: 'Failed to set user type' }, { status: 500 })
  }
}
