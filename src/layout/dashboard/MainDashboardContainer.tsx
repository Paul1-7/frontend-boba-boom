import { Button } from '@nextui-org/react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Content {
  title: string
  button?: string
  to?: string
}

interface Props {
  content: Content
  children: ReactNode
}

const MainDashboardContainer = ({ content, children }: Props) => {
  const { title, button, to } = content
  return (
    <div className="p-2 sm:p-8">
      <h1 className="pb-8 text-4xl font-semibold">{title}</h1>
      {button && (
        <div className="w-full pb-8">
          <Button
            color="secondary"
            variant="shadow"
            className="text-medium capitalize"
            as={Link}
            to={to ?? ''}
            relative="path"
          >
            {button}
          </Button>
        </div>
      )}

      {children}
    </div>
  )
}

export default MainDashboardContainer
