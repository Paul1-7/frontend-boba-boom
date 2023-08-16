import { Chip } from "@nextui-org/react";
import { StateCellProps } from "..";

const StateCell = ({ complement, value }: StateCellProps) => {
  const payload = Number(value);

  return (
    <>
      <Chip color={complement[payload].color}>
        {String(complement[payload].name)}
      </Chip>
    </>
  );
};

export default StateCell;
