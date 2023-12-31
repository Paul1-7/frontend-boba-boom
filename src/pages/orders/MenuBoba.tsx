import { TrashIc } from '@/assets'
import { Item, Select } from '@/components'
import { FlavourI, PriceMenuI } from '@/index'
import { Button } from '@nextui-org/react'
import { useFieldArray, useFormContext } from 'react-hook-form'

interface Props {
  shakeFlavours: Item<FlavourI>[] | undefined
  bobasFlavours: Item<FlavourI>[] | undefined
  prices: Item<PriceMenuI>[] | undefined
  handleDecrementBobas: () => void
}

const MenuBoba = ({
  shakeFlavours = [],
  bobasFlavours = [],
  prices = [],
  handleDecrementBobas
}: Props) => {
  const { control } = useFormContext()
  const { fields, remove } = useFieldArray({
    control,
    name: 'bobaDetail'
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
                handleDecrementBobas()
              }}
            >
              <TrashIc />
            </Button>
            <div className="w-full flex flex-col sm:gap-4  ">
              <div className="flex w-full flex-wrap sm:flex-nowrap sm:mb-0 sm:gap-4">
                <Select
                  label="Sabor de malteada"
                  name={`bobaDetail.${idx}.idShake`}
                  items={shakeFlavours}
                  isDataPath
                />
                <Select
                  label="Sabor de bobas"
                  name={`bobaDetail.${idx}.idBoba`}
                  items={bobasFlavours}
                  selectionMode="multiple"
                  isDataPath
                  isObjectValue
                />
              </div>
              <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
                <Select
                  label="Tamaño"
                  name={`bobaDetail.${idx}.idPrice`}
                  items={prices}
                  isDataPath
                />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default MenuBoba
