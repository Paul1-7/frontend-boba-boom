import {
  DASHBOARD_CONTENT,
  OrderStates,
  ROLES,
  SOCKETS_EVENTS,
  TABLE_STATES
} from '@/constants'
import { SocketContext } from '@/context'
import { useAuth } from '@/hooks'
import { MainDashboardContainer } from '@/layout'
import { changeStateOrder, getOrderById } from '@/services'
import { formatCurrencyToBOB } from '@/utils'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const { isAllowedRol } = useAuth() ?? {}
  const { socket } = useContext(SocketContext) ?? {}
  const { id } = useParams()

  const orderData = useQuery({
    queryKey: ['getOrderById'],
    queryFn: () => getOrderById(id),
    cacheTime: 0
  })

  const changeStateData = useMutation(
    async (data: { [x: string]: string }) => await changeStateOrder(data, id),
    {
      onSuccess: () => {
        orderData.refetch()
      }
    }
  )

  useEffect(() => {
    if (!changeStateData.isSuccess || changeStateData.isError) return

    socket?.emit(SOCKETS_EVENTS.CHANGE_STATE)
  }, [changeStateData.isSuccess, changeStateData.isError])

  const {
    customer,
    total,
    state = '',
    bobasDetail,
    waffleesDetail
  } = orderData.data ?? {}

  const stateTypes = TABLE_STATES.order as {
    [s: string]: {
      color:
        | 'success'
        | 'warning'
        | 'default'
        | 'primary'
        | 'secondary'
        | 'danger'
        | undefined
      name: string
    }
  }

  if (!orderData.data) return

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.detail}>
      <section className="text-medium w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap sm:flex-nowrap mb-6 sm:mb-0 gap-4">
          <div>
            <span className="font-semibold">Cliente:</span> {customer}
          </div>
          <div>
            <span className="font-semibold">Total:</span>{' '}
            {formatCurrencyToBOB(total ?? 0)}
          </div>
        </div>

        <div className="flex w-full flex-wrap sm:flex-nowrap  sm:mb-0 gap-4">
          <div>
            <span className="font-semibold">Estado: </span>
            {state in stateTypes && (
              <Chip color={stateTypes[state]?.color ?? 'default'}>
                {stateTypes[state]?.name}
              </Chip>
            )}
          </div>
        </div>
        {isAllowedRol([ROLES.RECEPCIONISTA_ORDENES, ROLES.ADMIN]) && (
          <div className="flex gap-2 justify-center mt-8">
            <Button
              color="default"
              variant="shadow"
              onPress={() =>
                changeStateData.mutate({ state: OrderStates.IN_PREPARATION })
              }
            >
              En preparación
            </Button>
            <Button
              color="success"
              variant="shadow"
              onPress={() =>
                changeStateData.mutate({ state: OrderStates.COMPLETE })
              }
            >
              Preparado
            </Button>
          </div>
        )}
        <h3 className="font-semibold text-lg w-full">Detalle de bobas</h3>
        {
          <article className="grid-responsive gap-4">
            {bobasDetail?.map(
              (
                { boba1Flavour, boba2Flavour, boba3Flavour, shakeFlavour },
                idx
              ) => (
                <Card
                  className="hover:scale-[1.02]"
                  key={boba1Flavour?.id + idx}
                >
                  <CardHeader className="flex flex-col gap-2 ">
                    <h4 className="font-semibold text-center">
                      Sabor de malteada
                    </h4>
                    <span>{shakeFlavour?.name}</span>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-2 items-center">
                    <h4 className="font-semibold items-center">
                      Sabor de las bobas
                    </h4>
                    <ul className="text-center">
                      {boba1Flavour && <li>{boba1Flavour.name}</li>}
                      {boba2Flavour && <li>{boba2Flavour.name}</li>}
                      {boba3Flavour && <li>{boba3Flavour.name}</li>}
                    </ul>
                  </CardBody>
                </Card>
              )
            )}
          </article>
        }
        <h3 className="font-semibold text-lg w-full">Detalle de wafflees</h3>
        {
          <article className="grid-responsive gap-4">
            {waffleesDetail?.map(
              ({ coatingFlavour, fruitFlavour, toppingFlavour }, idx) => (
                <Card
                  className="hover:scale-[1.02]"
                  key={coatingFlavour?.id + idx}
                >
                  <CardHeader className="flex flex-col gap-2">
                    <h4 className="font-semibold">Fruta</h4>
                    <span>{fruitFlavour?.name}</span>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-2 items-center">
                    <h4 className="font-semibold">Cubierta</h4>
                    <span>{coatingFlavour?.name}</span>
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex flex-col gap-2 justify-center">
                    <h4 className="font-semibold">Topping</h4>
                    <span>{toppingFlavour?.name ?? 'Ninguno'}</span>
                  </CardFooter>
                </Card>
              )
            )}
          </article>
        }
      </section>
    </MainDashboardContainer>
  )
}

export default OrderDetail
