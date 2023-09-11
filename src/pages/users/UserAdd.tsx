import { DASHBOARD_CONTENT, ROUTES, initialFormUser } from '@/constants'
import { MainDashboardContainer } from '@/layout'
import UserForm from './UserForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createUser, listRols } from '@/services'
import { UserI } from '@/index'
import { useForm } from '@/hooks'
import { userSchema } from '@/schemas'
import { Form } from '@/components'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

const UserAdd = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: createUser
  })

  const { methods } = useForm({
    initialForm: initialFormUser,
    schema: userSchema
  })

  const rolsData = useQuery({
    queryKey: ['listRols'],
    queryFn: listRols
  })

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate({ ...(data as UserI), idRol: [...data.idRol][0] })
  }

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.users.add}>
      <Form formMethods={methods} onSubmit={handleSubmit}>
        <UserForm isLoading={isLoading} rols={rolsData.data} />
      </Form>
      {isSuccess && !isError && <Navigate to={ROUTES.users.default} />}
    </MainDashboardContainer>
  )
}

export default UserAdd
