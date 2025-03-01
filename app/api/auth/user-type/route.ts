import { auth } from '@/lib/auth'
import { setUserType } from '@/server/db/auth'
import { NextResponse } from 'next/server'

//TODO: create an general interface for all api responses

export async function POST(request: Request) {
  const session = await auth()
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
    return NextResponse.json(undefined, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set user type' }, { status: 500 })
  }
}
