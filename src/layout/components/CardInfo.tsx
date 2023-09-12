import { userImg } from '@/assets'
import { useAuth } from '@/hooks'
import { Avatar } from '@nextui-org/react'

const CardInfo = () => {
  const { authenticated } = useAuth() ?? {}
  return (
    <div className="flex flex-col gap-2 text-white items-center mb-8">
      <Avatar showFallback src={userImg} />
      <p className="text-lg font-semibold">{authenticated?.user}</p>
      <p className="font-semibold text-sm">{authenticated?.rol?.name}</p>
    </div>
  )
}

export default CardInfo
