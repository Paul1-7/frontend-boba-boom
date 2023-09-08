import { DASHBOARD_CONTENT, ROUTES, initialFormFlavour } from '@/constants'
import { MainDashboardContainer } from '@/layout'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getFlavourById, listMenus, modifyFlavour } from '@/services'
import { FlavourI } from '@/index'
import { useForm } from '@/hooks'
import { flavourSchema } from '@/schemas'
import { Form } from '@/components'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'
import { typesList } from '@/apis'

const FlavourModify = () => {
  const { id } = useParams()
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    async (data: FlavourI) => await modifyFlavour(data, id)
  )

  const typeData = typesList()

  const flavourData = useQuery({
    queryKey: ['getFlavourById'],
    queryFn: () => getFlavourById(id)
  })

  const menuData = useQuery({
    queryKey: ['listMenus'],
    queryFn: listMenus
  })

  const { methods } = useForm({
    initialForm: initialFormFlavour,
    schema: flavourSchema,
    shouldLoadData: true,
    dataTarget: flavourData,
    onDataLoad: [flavourData, menuData]
  })

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate(data as FlavourI)
  }

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.flavours.add}>
      <Form formMethods={methods} onSubmit={handleSubmit}>
        {/* <FlavourForm
          menus={menuData.data}
          isLoading={isLoading}
          isLoadingData={menuData.isLoading}
          types={typeData}
        /> */}
      </Form>
      {isSuccess && !isError && <Navigate to={ROUTES.flavours.default} />}
    </MainDashboardContainer>
  )
}

export default FlavourModify
