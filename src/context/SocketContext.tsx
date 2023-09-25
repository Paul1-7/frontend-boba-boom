import { ReactNode, useContext, useEffect } from 'react'
import { createContext } from 'react'
import { useSockets } from '@/hooks'
import { BASE_URL } from '@/config'
import { SOCKETS_EVENTS } from '@/constants'
import { Socket } from 'socket.io-client'
import { OrderContext } from '.'
import { OrderI } from '..'

interface ContextProps {
  socket: Socket | undefined
  online: boolean | undefined
}

export const SocketContext = createContext<ContextProps | null>(null)

interface Props {
  children: ReactNode
}

export const SocketProvider = ({ children }: Props) => {
  const { socket, online } = useSockets(BASE_URL)
  const { dispatch } = useContext(OrderContext) ?? {}

  useEffect(() => {
    socket?.on(SOCKETS_EVENTS.ORDERS_LIST, (usuarios: OrderI[]) => {
      if (!dispatch) return

      dispatch({
        type: SOCKETS_EVENTS.ORDERS_LIST,
        payload: usuarios
      })
    })
  }, [socket])

  // useEffect(() => {
  //   socket?.on("mensaje-personal", (mensaje) => {
  //     dispatch({
  //       type: types.nuevoMensaje,
  //       payload: mensaje,
  //     });

  //   });
  // }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  )
}
