import { formatTime } from '@/utils'
import { CellProps } from '..'

const TimeCell = ({ value }: CellProps) => {
  return <>{formatTime(String(value))}</>
}

export default TimeCell
