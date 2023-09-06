import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { ActionCellProps } from '..'
import { VerticalDotsIc } from '@/assets'

const ActionCell = ({ value, complement }: ActionCellProps) => {
  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown aria-labelledby="acciones de tablas">
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <VerticalDotsIc className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-labelledby="acciones de tablas"
          onAction={(key) => {
            complement.onAction(String(key), value)
          }}
        >
          {complement.items.map(({ label, key }) => (
            <DropdownItem key={key}>{label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default ActionCell
