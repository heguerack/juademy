import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CoursesPage() {
  return (
    <div>
      <Link href={'/teacher/create'}>
        <Button>Nuevo curso</Button>
      </Link>
    </div>
  )
}
