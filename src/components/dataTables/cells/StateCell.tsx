import { Chip } from "@nextui-org/react";
import { StateCellProps } from "..";

const StateCell = ({ complement, value }: StateCellProps) => {
  if (Array.isArray(complement)) {
    const payload = Number(value);
    return (
      <>
        <Chip color={complement[payload].color}>
          {String(complement[payload].name)}
        </Chip>
      </>
    );
  }

  const payload = String(value);
  return (
    <>
      <Chip color={complement[payload].color}>
        {String(complement[payload].name)}
      </Chip>
    </>
  );
};

export default StateCell;
