import { MenuItem as MenuItemI } from '@/constants'
import { Link as LinkNextUI, LinkProps, Tooltip } from '@nextui-org/react'
import { HTMLProps } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  menuItem: MenuItemI
  isActive: boolean
  isOpen?: boolean
  linkProps?: LinkProps
  containerProps?: HTMLProps<HTMLDivElement>
}

const MenuItem = ({
  menuItem,
  isActive,
  isOpen,
  linkProps,
  containerProps
}: Props) => {
  const { Icon, name, path } = menuItem

  return (
    <div {...containerProps}>
      <Tooltip content={name} placement="right" isDisabled={!isOpen}>
        <LinkNextUI
          className={`px4 flex w-full gap-4 overflow-hidden rounded-xl px-4 py-3 font-semibold text-whiteDark
          transition-background hover:bg-secondary hover:text-white hover:opacity-100  ${
            isActive && 'bg-secondary'
          }`}
          size="md"
          as={Link}
          to={path}
          disableAnimation
          {...linkProps}
        >
          <span className="w-6">
            <Icon />
          </span>
          {name}
        </LinkNextUI>
      </Tooltip>
    </div>
  )
}

export default MenuItem
