import { Input, Item, Select } from '@/components'
import { ROUTES } from '@/constants'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'

interface Props<T, R> {
  menus: T[] | undefined | Item<T>[]
  types: R[] | undefined
  isLoading: boolean
  isLoadingData?: boolean
}

const FlavourForm = <T, R>({
  menus,
  types,
  isLoading,
  isLoadingData
}: Props<T, R>) => {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
          <Input label="Nombre" name={'name'} />
          <Select
            label="Menu"
            name={'idMenu'}
            items={menus}
            isLoading={isLoadingData}
          />
        </div>
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
          <Select
            label="Tipo"
            name={'type'}
            items={types}
            isLoading={isLoadingData}
          />
          <Input label="Precio" name={'price'} endContent="Bs." />
        </div>
      </div>
      <div className="flex flow-row gap-2 justify-center mt-4">
        <Button color="warning" as={Link} to={ROUTES.flavours.default}>
          Cancelar
        </Button>
        <Button color="success" isLoading={isLoading} type="submit">
          Enviar
        </Button>
      </div>
    </>
  )
}

export default FlavourForm
