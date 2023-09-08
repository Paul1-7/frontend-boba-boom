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
  const { socket, online, conectarSocket, desconectarSocket } =
    useSockets(BASE_URL)
  // const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(OrderContext) ?? {}

  // useEffect(() => {
  //   if (auth.logged) {
  //     conectarSocket();
  //   }
  // }, [auth, conectarSocket]);

  // useEffect(() => {
  //   if (!auth.logged) {
  //     desconectarSocket();
  //   }
  // }, [auth, desconectarSocket]);

  // Escuchar los cambios en los usuarios conectados
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
