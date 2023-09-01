import { formatCurrencyToBOB } from "@/utils";
import { CellProps } from "..";

const CurrencyCell = ({ value }: CellProps) => {
  return <>{formatCurrencyToBOB(Number(value))}</>;
};

export default CurrencyCell;
