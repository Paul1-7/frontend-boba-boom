import { MenuItem as MenuItemI } from '@/constants'
import { Card } from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import MenuItem from './MenuItem.tsx'
import { getAllowedMenus, isActivePathname } from '@/utils'
import { motion } from 'framer-motion'
import CardInfo from './CardInfo.tsx'
import useAuth from '@/hooks/useAuth.ts'

interface Props {
  menuItems: MenuItemI[]
  isMenuOpen: boolean
  matchedBreakpoint: boolean
  handleOpen?: () => void
}

const Sidebar = ({ menuItems, isMenuOpen, matchedBreakpoint }: Props) => {
  const { pathname } = useLocation()
  const { authenticated } = useAuth() ?? {}
  const allowedMenus = getAllowedMenus(menuItems, authenticated?.rol?.id)

  return (
    <motion.aside
      initial={false}
      animate={{ width: isMenuOpen && !matchedBreakpoint ? '5rem' : '12rem' }}
      transition={{ duration: 0.3 }}
      className="h-screen-navbar scroll hidden overflow-y-auto  ss:block"
    >
      <Card
        className={`bg-primary-blur h-full w-full flex-col gap-2   rounded-none px-3 py-8`}
      >
        <CardInfo isMenuOpen={isMenuOpen} />

        {allowedMenus.map((menuItem) => {
          const isActive = isActivePathname(pathname, menuItem.path)
          return (
            <MenuItem
              isActive={isActive}
              menuItem={menuItem}
              key={menuItem.name}
              isOpen={isMenuOpen}
            />
          )
        })}
      </Card>
    </motion.aside>
  )
}

export default Sidebar
