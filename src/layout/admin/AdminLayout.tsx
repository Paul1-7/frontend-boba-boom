import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from '..'
import { MENU_ITEMS_DASHBOARD } from '@/constants'

interface Props {
  children?: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <section className="flex">
        <Sidebar menuItems={MENU_ITEMS_DASHBOARD} />
        {children}
        <Outlet />
      </section>
    </>
  )
}

export default AdminLayout
