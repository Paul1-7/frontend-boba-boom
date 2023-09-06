import { DataTable, DialogConfirmation } from '@/components'
import {
  ACTIONS_CRUD,
  COLUMNS_DATA_TABLE,
  DASHBOARD_CONTENT,
  ROUTES,
  TABLE_STATES
} from '@/constants'
import { MainDashboardContainer } from '@/layout'
import { deleteFlavour, listFlavours } from '@/services'
import { useDisclosure } from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const idValue = useRef<string | undefined>(undefined)
  const navigate = useNavigate()
  const { data, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: listFlavours
  })

  const onActionsTable = (key: string, value: string) => {
    if (key === 'modify') {
      navigate(`${ROUTES.flavours.modify}/${value}`)
      return
    }

    if (key === 'delete') {
      onOpen()
      idValue.current = value
      return
    }
  }

  const deleteFlavourData = useMutation({
    mutationFn: deleteFlavour,
    onSuccess: () => {
      refetch()
    }
  })

  const handleDelete = () => {
    if (!idValue.current) return
    deleteFlavourData.mutate(idValue.current)
    onClose()
  }

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.flavours.default}>
      <DialogConfirmation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClick={handleDelete}
      />
      <DataTable
        columns={COLUMNS_DATA_TABLE.flavours}
        data={data}
        customData={[
          {
            field: 'type',
            complement: TABLE_STATES.flavoursType
          },
          {
            field: 'id',
            complement: {
              items: ACTIONS_CRUD,
              onAction: onActionsTable
            }
          }
        ]}
      />
    </MainDashboardContainer>
  )
}

export default Orders
