import { useAuth } from '@/hooks'
import { subscribeToPushNotifications } from '@/services'
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext
} from 'react'

interface NotificationContextType {
  notificationPermission: NotificationPermissionState
  requestNotificationPermission: () => void
}

type NotificationPermissionState = 'default' | 'denied' | 'granted'

const initialContext: NotificationContextType = {
  notificationPermission: 'default',
  requestNotificationPermission: () => {}
}

export const NotificationContext =
  createContext<NotificationContextType>(initialContext)

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { authenticated } = useAuth() ?? {}
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermissionState>('default')

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission as NotificationPermissionState)
      })
    } else {
      setNotificationPermission('granted')
    }
  }, [])

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission as NotificationPermissionState)
    })
  }

  useEffect(() => {
    if (!authenticated?.id) return

    subscribeToPushNotifications(authenticated.id)
  }, [])

  return (
    <NotificationContext.Provider
      value={{ notificationPermission, requestNotificationPermission }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  return useContext(NotificationContext)
}
