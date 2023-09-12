import { Input, Item, Select } from '@/components'
import { ROUTES } from '@/constants'
import { RolI } from '@/index'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'

interface Props {
  isLoading: boolean
  rols?: Item<RolI>[]
}

const FlavourForm = ({ isLoading, rols = [] }: Props) => {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
          <Input label="Usuario" name={'user'} />
          <Select label="Selecciona un rol" name={'idRol'} items={rols} />
        </div>
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
          <Input label="Contraseña" name={'password'} type="password" />
          <Input
            label="Repetir contraseña"
            name={'repeatPassword'}
            type="password"
          />
        </div>
      </div>
      <div className="flex flow-row gap-2 justify-center mt-4">
        <Button color="warning" as={Link} to={ROUTES.users.default}>
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
