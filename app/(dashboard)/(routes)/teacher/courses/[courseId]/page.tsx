import { IconBadge } from '@/components/IconBadge'
import prisma from '@/lib/connect'
import { auth } from '@clerk/nextjs'

import { LayoutDashboard } from 'lucide-react'
import { redirect } from 'next/navigation'

import TitleForm from './_components/TitleForm'

export default async function page({
  params,
}: {
  params: { courseId: string }
}) {
  //grab courseID from params of crated course via params
  console.log(params)
  const id = params.courseId
  console.log(id)

  //grab userId from auth, redirect if not user
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

  //fetch course
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  })
  console.log(course)
  if (!course) {
    return redirect('/')
  }
  console.log(course)

  //required fileds
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ]
  const totalFields = requiredFields.length
  //the following returns whats not iqual to true
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>Curso setup</h1>
          <span>Complete todos los campos {completionText}</span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl'>Customiza tu curso</h2>
          </div>
          {/* we could also get the courseId with initialData.id , but we are passing the id right away from here*/}
          <TitleForm initialData={course.title} courseId={course.id} />
        </div>
      </div>
    </div>
  )
}
