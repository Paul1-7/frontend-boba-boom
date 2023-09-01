import { CellProps } from "..";

const DefaultCell = ({ value }: CellProps) => {
  return <>{String(value)}</>;
};

export default DefaultCell;
