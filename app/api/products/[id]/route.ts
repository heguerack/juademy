import { getAuthSession } from '@/utils/auth'
import prisma from '@/utils/connect'
import { NextResponse, NextRequest } from 'next/server'

// type Props = {
//   params: { id: string }
// }

//Get single Product
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params
  console.log({ params })

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    })
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    )
  }
}

//Delete single Product
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params
  console.log({ params })

  const session = await getAuthSession()

  if (session?.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: {
          id: id,
        },
      })
      return new NextResponse(JSON.stringify('Product has been deleted'), {
        status: 200,
      })
    } catch (error) {
      console.log(error)
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrong' }),
        {
          status: 500,
        }
      )
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'You are not authenticated' }),
      {
        status: 403,
      }
    )
  }
}
