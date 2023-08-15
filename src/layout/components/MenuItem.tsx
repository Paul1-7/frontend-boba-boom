import { MenuItem as MenuItemI } from "@/constants";
import { Link as LinkNextUI, Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";

interface Props {
  menuItem: MenuItemI;
  isActive: boolean;
  isOpen: boolean;
}

const MenuItem = ({ menuItem, isActive, isOpen }: Props) => {
  const { Icon, name, path } = menuItem;

  return (
    <Tooltip content={name} placement="right" isDisabled={!isOpen}>
      <LinkNextUI
        className={`px4 flex w-full gap-4 overflow-hidden rounded-xl px-4 py-3 font-semibold text-whiteDark hover:bg-secondary hover:text-white hover:opacity-100  ${
          isActive && "bg-secondary"
        }`}
        size="md"
        as={Link}
        to={path}
        disableAnimation
      >
        <span className="w-6">
          <Icon />
        </span>
        {name}
      </LinkNextUI>
    </Tooltip>
  );
};

export default MenuItem;
