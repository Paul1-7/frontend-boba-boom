import { MenuItem } from '@/constants'
import { Card, Link as LinkNextUI } from '@nextui-org/react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  menuItems: MenuItem[]
}

const Sidebar = ({ menuItems }: Props) => {
  const { pathname } = useLocation()
  const pathnameArray = pathname.split('/')
  const url = pathnameArray[pathnameArray.length - 1]

  return (
    <Card className="sm:w-[300px] w-full md:w-[350px] h-screen  p-2 bg-primary flex flex-col gap-2 ">
      {menuItems.map(({ name, Icon, path }, index) => {
        const isActive = path.includes(url)
        return (
          <LinkNextUI
            key={`${name}-${index}`}
            className={`w-full flex gap-3 px4 hover:bg-secondary px-4 py-3 text-whiteDark  rounded-xl hover:text-white hover:opacity-100  ${
              isActive && 'bg-secondary'
            }`}
            size="sm"
            as={Link}
            to={path}
            disableAnimation
          >
            <Icon /> {name}
          </LinkNextUI>
        )
      })}
    </Card>
  )
}

export default Sidebar
