import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full min-h-[100vh] flex items-center justify-center'>
      {children}
    </div>
  )
}
