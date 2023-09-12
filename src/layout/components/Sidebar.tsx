import { MenuItem as MenuItemI } from '@/constants'
import { Card } from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import MenuItem from './MenuItem.tsx'
import { isActivePathname } from '@/utils'
import { motion } from 'framer-motion'
import CardInfo from './CardInfo.tsx'

interface Props {
  menuItems: MenuItemI[]
  isMenuOpen: boolean
  matchedBreakpoint: boolean
}

const Sidebar = ({ menuItems, isMenuOpen, matchedBreakpoint }: Props) => {
  const { pathname } = useLocation()

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
        <CardInfo />

        {menuItems.map((menuItem) => {
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
