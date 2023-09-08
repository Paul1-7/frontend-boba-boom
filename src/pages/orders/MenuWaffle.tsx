import { TrashIc } from '@/assets'
import { Item, Select } from '@/components'
import { FlavourI, PriceMenuI } from '@/index'
import { Button } from '@nextui-org/react'
import { useFieldArray, useFormContext } from 'react-hook-form'

interface Props {
  fruitFlavours: Item<FlavourI>[] | undefined
  coatingFlavours: Item<FlavourI>[] | undefined
  toppingFlavours: Item<FlavourI>[] | undefined
  prices: Item<PriceMenuI>[] | undefined
  handleDecrementWaffle: () => void
}

const MenuWafflee = ({
  fruitFlavours = [],
  coatingFlavours = [],
  toppingFlavours = [],
  prices = [],
  handleDecrementWaffle
}: Props) => {
  const { control } = useFormContext()
  const { fields, remove } = useFieldArray({
    control,
    name: 'waffleeDetail'
  })

  return (
    <>
      {fields.map((item, idx) => {
        return (
          <div
            className="flex flex-row gap-4  items-center mb-6 bg-slate-50 p-2 pb-4 rounded-lg border-slate-100 border-1"
            key={item.id}
          >
            <Button
              isIconOnly
              size="sm"
              color="danger"
              onClick={() => {
                remove(idx)
                handleDecrementWaffle()
              }}
            >
              <TrashIc />
            </Button>
            <div className="w-full flex flex-col sm:gap-4  ">
              <div className="flex w-full flex-wrap sm:flex-nowrap sm:mb-0 sm:gap-4">
                <Select
                  label="Elije la fruta"
                  name={`waffleeDetail.${idx}.idFruit`}
                  items={fruitFlavours}
                  isDataPath
                />
                <Select
                  label="Elije la cubierta "
                  name={`waffleeDetail.${idx}.idCoating`}
                  items={coatingFlavours}
                  isDataPath
                />
              </div>
              <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
                <Select
                  label="Elije el topping "
                  name={`waffleeDetail.${idx}.idTopping`}
                  items={toppingFlavours}
                  isDataPath
                  isObjectValue
                />
                <Select
                  label="Tamaño"
                  name={`waffleeDetail.${idx}.idPrice`}
                  items={prices}
                  isDataPath
                  isObjectValue
                />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default MenuWafflee
