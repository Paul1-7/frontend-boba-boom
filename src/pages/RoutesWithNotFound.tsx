import { Route, Routes } from 'react-router-dom'
import Notfound from './NotFound'

interface Props {
  children: JSX.Element[] | JSX.Element
}
function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}
export default RoutesWithNotFound
