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
          <div className="flex flex-row gap-2  items-center mb-6" key={item.id}>
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
                />
              </div>
              <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
                <Select
                  label="Tamaño"
                  name={`bobaDetail.${idx}.price`}
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
