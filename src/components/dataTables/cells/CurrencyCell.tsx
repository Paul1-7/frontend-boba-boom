import { CurrencyCellProps } from "..";

const CurrencyCell = ({ value }: CurrencyCellProps) => {
  return <>{String(value)}</>;
};

export default CurrencyCell;
