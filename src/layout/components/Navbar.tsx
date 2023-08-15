import MenuItem from "./MenuItem";
import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as LinkNextUI,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { MenuItem as MenuItemI } from "@/constants";
import { isActivePathname } from "@/utils";

interface Props {
  menuItems: MenuItemI[];
  isMenuOpen: boolean;
  handleOpen: (value: boolean) => void;
  matchedBreakpoint: boolean;
}

export default function Navbar({
  menuItems,
  handleOpen,
  isMenuOpen,
  matchedBreakpoint,
}: Props) {
  const { pathname } = useLocation();
  const isOpen = matchedBreakpoint && isMenuOpen;

  return (
    <NavbarNextUI
      onMenuOpenChange={handleOpen}
      isMenuOpen={isOpen}
      className={"bg-primary-blur justify-between text-whiteDark"}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close menu" : "Open menu"}
          isSelected={isOpen}
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Boba Boom</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <LinkNextUI href="#">Iniciar sesión</LinkNextUI>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-primary-blur sm:hidden">
        {menuItems.map((menuItem) => {
          const isActive = isActivePathname(pathname, menuItem.path);
          return (
            <NavbarMenuItem key={`${menuItem.name}`}>
              <MenuItem menuItem={menuItem} isActive={isActive} />
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </NavbarNextUI>
  );
}
