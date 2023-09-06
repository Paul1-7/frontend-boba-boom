import { DASHBOARD_CONTENT, ROUTES, initialFormFlavour } from '@/constants'
import { MainDashboardContainer } from '@/layout'
import FlavourForm from './FlavourForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFlavour, listMenus } from '@/services'
import { FlavourI } from '@/index'
import { useForm } from '@/hooks'
import { flavourSchema } from '@/schemas'
import { Form } from '@/components'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { typesList } from '@/apis'

const FlavourAdd = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: createFlavour
  })

  const typeData = typesList()

  const menuData = useQuery({
    queryKey: ['listMenus'],
    queryFn: listMenus
  })

  const { methods } = useForm({
    initialForm: initialFormFlavour,
    schema: flavourSchema
  })

  console.log(methods.formState.errors)

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate(data as FlavourI)
  }

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.flavours.add}>
      <Form formMethods={methods} onSubmit={handleSubmit}>
        <FlavourForm
          menus={menuData.data}
          isLoading={isLoading}
          isLoadingData={menuData.isLoading}
          types={typeData}
        />
      </Form>
      {isSuccess && !isError && <Navigate to={ROUTES.flavours.default} />}
    </MainDashboardContainer>
  )
}

export default FlavourAdd
