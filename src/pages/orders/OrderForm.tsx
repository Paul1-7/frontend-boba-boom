import { CounterButton, Input } from '@/components'
import { ROUTES } from '@/constants'
import { Accordion, AccordionItem, Button, Divider } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { MenuBoba } from '..'
import { useCounterOrder } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { FlavourI, PriceMenuI } from '@/index'
import MenuWafflee from './MenuWaffle'
import { useFormContext } from 'react-hook-form'
import { formatCurrencyToBOB } from '@/utils'

interface Props {
  flavours: UseQueryResult<FlavourI[], unknown>
  priceMenu: UseQueryResult<PriceMenuI[], unknown>
  isLoading: boolean
  isLoadingData?: boolean
}

const FlavourForm = ({ isLoading, flavours, priceMenu }: Props) => {
  const { watch } = useFormContext()
  const total = watch('order.total')

  const {
    counters,
    handleDecrementBobas,
    handleIncrementBobas,
    bobaShakeFlavours,
    bobaFlavours,
    bobaPrices,
    coatingFlavours,
    fruitsFlavours,
    handleDecrementWafflee,
    handleIncrementWafflee,
    toppingFlavours,
    waffleePrices
  } = useCounterOrder({
    flavoursData: flavours,
    priceMenuData: priceMenu
  })

  return (
    <>
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
          <Input
            label="Nombre del cliente"
            name={'order.customer'}
            isDataPath
          />
        </div>
      </div>
      <Accordion variant="splitted" className="mb-4">
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
        <AccordionItem
          as={'section'}
          key="2"
          aria-label="Seccion para menu wafflee"
          title="Boba wafflee"
          startContent={
            <CounterButton
              handleDecrement={handleDecrementWafflee}
              handleIncrement={handleIncrementWafflee}
              value={counters.bobaWaffles}
            />
          }
        >
          <MenuWafflee
            prices={waffleePrices}
            fruitFlavours={fruitsFlavours}
            coatingFlavours={coatingFlavours}
            toppingFlavours={toppingFlavours}
            handleDecrementWaffle={handleDecrementWafflee}
          />
        </AccordionItem>
      </Accordion>
      <Divider className=" my-2" />
      <p className="text-2xl px-2 font-semibold ">{`Total: ${formatCurrencyToBOB(
        total
      )}`}</p>
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
