import MenuItem from './MenuItem'
import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button
} from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import { MenuItem as MenuItemI } from '@/constants'
import { getAllowedMenus, isActivePathname } from '@/utils'
import { useAuth } from '@/hooks'
import CardInfo from './CardInfo'

interface Props {
  menuItems: MenuItemI[]
  isMenuOpen: boolean
  handleOpen: () => void
  matchedBreakpoint: boolean
}

export default function Navbar({
  menuItems,
  handleOpen,
  isMenuOpen,
  matchedBreakpoint
}: Props) {
  const { logout, authenticated } = useAuth() ?? {}
  const { pathname } = useLocation()
  const isOpen = matchedBreakpoint && isMenuOpen
  const allowedMenus = getAllowedMenus(menuItems, authenticated?.rol?.id)

  return (
    <NavbarNextUI
      onMenuOpenChange={handleOpen}
      isMenuOpen={isOpen}
      className={'bg-primary-blur justify-between text-whiteDark shadow-md '}
    >
      <NavbarContent>
        <NavbarMenuToggle aria-label={isOpen ? 'Close menu' : 'Open menu'} />
        <NavbarBrand>
          <p className="font-bold text-inherit">Boba Boom</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={logout} color="secondary">
            Cerrar sesion
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-primary-blur sm:hidden">
        <CardInfo isMenuOpen={false} />
        {allowedMenus.map((menuItem) => {
          const isActive = isActivePathname(pathname, menuItem.path)
          return (
            <NavbarMenuItem key={`${menuItem.name}`}>
              <MenuItem
                menuItem={menuItem}
                isActive={isActive}
                linkProps={{
                  onClick: () => {
                    handleOpen()
                  }
                }}
              />
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </NavbarNextUI>
  )
}
