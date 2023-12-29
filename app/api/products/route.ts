// import { PrismaClient } from '@prisma/client'
import prisma from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
// const prisma = new PrismaClient()

// fetch All Products
export const GET = async (req: NextRequest) => {
  // const url = new URL(req.url)
  // const cat = url.searchParams.get('cat')

  const { searchParams } = new URL(req.url)
  const cat = searchParams.get('cat')
  console.log(searchParams)

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    })
    return new NextResponse(JSON.stringify(products), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: 'Something wewnt wrong' }),
      { status: 500 }
    )
  }
}

// Add a product
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    console.log(body)
    const product = await prisma.product.create({
      data: body,
    })
    console.log(product)

    return new NextResponse(JSON.stringify(product), { status: 201 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: 'Something wewnt wrong' }),
      { status: 500 }
    )
  }
}
