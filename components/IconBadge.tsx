import { LucideIcon } from 'lucide-react'
//the follwing is coming form Shadcn
// with cva we can change the variants, check at the button that the shadcn guys created, this how they do it!
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const backGroundVariants = cva('rounded-full items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-sky-100',
      success: 'bg-emerald-100',
    },
    // iconVariant: {
    //   dafault: 'text-sky-700',
    //   success: 'text-emerald-700',
    // },
    size: {
      default: 'p-2',
      sm: 'p-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const IconVariants = cva('rounded-full items-center justify-center', {
  variants: {
    variant: {
      default: 'text-sky-700',
      success: 'text-emerald-700',
    },
    size: {
      default: 'h-8 w-8',
      // sm: 'h-4 w-4 md:h-8 md:w-8',
      sm: 'h-4 w-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type BackgroundVariantProps = VariantProps<typeof backGroundVariants>
type IconVariantProps = VariantProps<typeof IconVariants>

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backGroundVariants({ variant, size }))}>
      <Icon className={cn(IconVariants({ variant, size }))} />
    </div>
  )
}
