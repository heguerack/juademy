// import prisma from '@/utils/connect'
import prisma from '@/lib/connect'
import { auth } from '@clerk/nextjs'
import { NextResponse, NextRequest } from 'next/server'

// fetch menu or categories
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json()
    const { title } = body
    const { userId } = auth()
    console.log(body)
    console.log(userId)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await prisma.course.create({
      data: {
        userId,
        title,
      },
    })
    return new NextResponse(JSON.stringify(course), { status: 200 })
  } catch (error) {
    console.log('CoursesError:', error)
    return new NextResponse(
      JSON.stringify({ message: 'Something wewnt wrong' }),
      { status: 500 }
    )
  }
}

// export const POST = () => {
//   return new NextResponse('Hello Frank, we made it!!', { status: 200 })
// }
