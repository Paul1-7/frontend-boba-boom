import { useAuth } from '@/hooks'
import { Button } from '@nextui-org/react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Content {
  title: string
  button?: {
    text: string
    to: string
    allowedRols: string[]
  }
  to?: string
}

interface Props {
  content: Content
  children: ReactNode
}

const MainDashboardContainer = ({ content, children }: Props) => {
  const { isAllowedRol } = useAuth() ?? {}
  const { title, button } = content
  return (
    <div className="p-2 sm:p-8">
      <h1 className="pb-8 text-4xl font-semibold">{title}</h1>
      {button && isAllowedRol(button?.allowedRols) && (
        <div className="w-full pb-8">
          <Button
            color="secondary"
            variant="shadow"
            className="text-medium capitalize"
            as={Link}
            to={button.to}
            relative="path"
          >
            {button.text}
          </Button>
        </div>
      )}

      {children}
    </div>
  )
}

export default MainDashboardContainer
