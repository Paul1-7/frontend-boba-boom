import { MinusIc, PlusIc } from '@/assets'
import { Button, ButtonGroup } from '@nextui-org/react'

interface Props {
  handleIncrement: () => void
  handleDecrement: () => void
  value: number
}

const CounterButton = ({ handleDecrement, handleIncrement, value }: Props) => {
  return (
    <ButtonGroup variant="solid" color="secondary" size="sm">
      <Button isIconOnly onPress={handleDecrement} as="div">
        <MinusIc />
      </Button>
      <div className="p-2">{value}</div>
      <Button isIconOnly onPress={handleIncrement} as="div">
        <PlusIc />
      </Button>
    </ButtonGroup>
  )
}

export default CounterButton
