import { CounterButton, Input, Select } from '@/components'
import { ROUTES } from '@/constants'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { MenuBoba } from '..'
import { useCounterOrder } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { FlavourI, PriceMenuI } from '@/index'

interface Props {
  flavours: UseQueryResult<FlavourI[], unknown>
  priceMenu: UseQueryResult<PriceMenuI[], unknown>
  isLoading: boolean
  isLoadingData?: boolean
}

const FlavourForm = ({
  isLoading,
  isLoadingData,
  flavours,
  priceMenu
}: Props) => {
  const {
    counters,
    handleDecrementBobas,
    handleIncrementBobas,
    bobaShakeFlavours,
    bobaFlavours,
    bobaPrices
  } = useCounterOrder({
    flavoursData: flavours,
    priceMenuData: priceMenu
  })

  return (
    <>
      <Accordion variant="splitted">
        <AccordionItem
          as={'section'}
          key="1"
          aria-label="Accordion 1"
          title="Boba boo"
          startContent={
            <CounterButton
              handleDecrement={handleDecrementBobas}
              handleIncrement={handleIncrementBobas}
              value={counters.bobaBoos}
            />
          }
        >
          <MenuBoba
            shakeFlavours={bobaShakeFlavours}
            bobasFlavours={bobaFlavours}
            prices={bobaPrices}
            handleDecrementBobas={handleDecrementBobas}
          />
        </AccordionItem>
        {/* <AccordionItem
          as={'section'}
          key="2"
          aria-label="Accordion 1"
          title="Waffles boo"
          startContent={<CounterButton getCounter={handleCounterWafflees} />}
        >
          contend
        </AccordionItem> */}
      </Accordion>
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
          <Input label="Nombre" name={'name'} />
          <Select
            label="Menu"
            name={'idMenu'}
            items={[]}
            isLoading={isLoadingData}
          />
        </div>
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
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
