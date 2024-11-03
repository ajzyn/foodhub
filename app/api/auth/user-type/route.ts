import getSession from '@/lib/getSession'
import { setUserType } from '@/server/db/user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await getSession()
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  if (!body.userType) {
    return NextResponse.json({ error: 'Missing userId or userType' }, { status: 400 })
  }

  try {
    await setUserType(userId, body.userType)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting user type:', error)
    return NextResponse.json({ error: 'Failed to set user type' }, { status: 500 })
  }
}
