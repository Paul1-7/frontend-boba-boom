import { DASHBOARD_CONTENT, ROUTES, initialFormUser } from '@/constants'
import { MainDashboardContainer } from '@/layout'
import UserForm from './UserForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserById, listRols, modifyUser } from '@/services'
import { UserI } from '@/index'
import { useForm } from '@/hooks'
import { userSchema } from '@/schemas'
import { Form } from '@/components'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

const UserModify = () => {
  const { id } = useParams()
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    async (data: UserI) => await modifyUser(data, id)
  )

  const userData = useQuery({
    queryKey: ['getUserById'],
    queryFn: () => getUserById(id)
  })

  const rolsData = useQuery({
    queryKey: ['listRols'],
    queryFn: listRols
  })

  const { methods } = useForm({
    initialForm: initialFormUser,
    schema: userSchema,
    shouldLoadData: true,
    dataTarget: userData,
    onDataLoad: [userData, rolsData]
  })
  console.log('TCL: UserModify -> methods', methods.formState.errors)

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate({ ...(data as UserI), idRol: [...data.idRol][0] })
  }

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.users.modify}>
      <Form formMethods={methods} onSubmit={handleSubmit}>
        <UserForm isLoading={isLoading} rols={rolsData.data} />
      </Form>
      {isSuccess && !isError && <Navigate to={ROUTES.users.default} />}
    </MainDashboardContainer>
  )
}

export default UserModify
