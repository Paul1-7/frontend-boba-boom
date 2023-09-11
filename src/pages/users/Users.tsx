import { DataTable, DialogConfirmation } from '@/components'
import {
  ACTIONS_CRUD,
  COLUMNS_DATA_TABLE,
  DASHBOARD_CONTENT,
  ROUTES
} from '@/constants'
import { MainDashboardContainer } from '@/layout'
import { deleteUser, listUsers } from '@/services'
import { useDisclosure } from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const idValue = useRef<string | undefined>(undefined)
  const navigate = useNavigate()
  const { data, refetch } = useQuery({
    queryKey: ['listUsers'],
    queryFn: listUsers
  })

  const onActionsTable = (key: string, value: string) => {
    if (key === 'modify') {
      navigate(`${ROUTES.users.modify}/${value}`)
      return
    }

    if (key === 'delete') {
      onOpen()
      idValue.current = value
      return
    }
  }

  const deleteUserData = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      refetch()
    }
  })

  const handleDelete = () => {
    if (!idValue.current) return
    deleteUserData.mutate(idValue.current)
    onClose()
  }

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.users.default}>
      <DialogConfirmation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClick={handleDelete}
      />
      <DataTable
        columns={COLUMNS_DATA_TABLE.users}
        data={data}
        customData={[
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

export default Users
