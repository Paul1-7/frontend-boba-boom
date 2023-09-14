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

interface Notification {
  title: string
  body: string
}

export const SocketProvider = ({ children }: Props) => {
  const { socket, online } = useSockets(BASE_URL)
  const { dispatch } = useContext(OrderContext) ?? {}

  useEffect(() => {
    socket?.on(
      SOCKETS_EVENTS.ORDERS_LIST,
      (usuarios: OrderI[], notification: Notification | undefined) => {
        if (!dispatch) return

        if (notification) {
          const noti = new Notification(notification.title, {
            body: notification.body,
            silent: false,
            vibrate: [200, 100, 200]
          })

          noti.addEventListener('close', (e) => {
            console.log(e)
          })
        }

        dispatch({
          type: SOCKETS_EVENTS.ORDERS_LIST,
          payload: usuarios
        })
      }
    )
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
