'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'title is required',
  }),
})

export default function TitleForm({
  initialData,
  courseId,
}: {
  initialData: string
  courseId: string
}) {
  return (
    <div>
      <div>{initialData}</div>
      <div>{courseId}</div>
    </div>
  )
}
