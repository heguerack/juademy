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

export default function CreatePage() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })
  const { isSubmitting, isValid } = form.formState

  // 2. Define a submit handler.

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    try {
      const res = await axios.post('/api/courses', values)
      console.log(res)
      toast.success('Nuevo curso ha sido creado!')
      router.push(`/teacher/courses/${res.data.id}`)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className='max-w-5xl max-auto  felx items-center md:justify-center h-full p-6'>
      <div>
        <h1>Nombra tu curso</h1>
        <p>
          Come te gustaria llamar tu curso, no te preocupes, puedes cambiarlo
          despues.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomber de curso</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. "Dinamica Estructural 3: Vibraciones"'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Que vas ha ensenar en este curso?
                  </FormDescription>
                  {/* display erros if any */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center gap-2'>
              <Link href='/'>
                <Button type='button' variant={'ghost'}>
                  Cancel
                </Button>
              </Link>
            </div>
            <Button disabled={!isValid || isSubmitting}>Continua</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
