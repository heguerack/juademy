import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'

export default function Sidebar() {
  return (
    <div className='flex h-full flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>

      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}
