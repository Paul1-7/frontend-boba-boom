import { Axios } from '@/apis'
import { PUBLIC_VAPID_KEY } from '@/config'
import { urlBase64ToUint8Array } from '@/utils'

const PUSH_SUSCRIPTIONS = 'api/v1/suscriptions-push'

export const subscribeToPushNotifications = async (
  idUser: string
): Promise<void> => {
  if (!('Notification' in window)) {
    throw new Error('Las notificaciones no son compatibles en este navegador.')
  }

  const registration = await navigator.serviceWorker.ready

  const options = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  }

  const newSubscription = await registration.pushManager.subscribe(options)

  const data = {
    token: JSON.stringify(newSubscription),
    idUser
  }

  console.log('TCL: newSubscription', newSubscription)

  await Axios.post(PUSH_SUSCRIPTIONS, data)
}
