import { auth } from '@/lib/auth'
import { getCategories } from '@/server/db/categories'

import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('categories!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  // const session = await auth()

  // if (!session) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  // }

  try {
    const categories = await getCategories()

    return NextResponse.json(
      {
        message: 'Categories fetched successfully',
        data: categories
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching categories', error }, { status: 400 })
  }
}
