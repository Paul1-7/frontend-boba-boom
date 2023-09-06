import { SelectProps } from '../types';
import { SelectMemo } from '../memo';
import { useFormContext } from 'react-hook-form';


const Select =<T,>(props:SelectProps<T>) => {
  const methods = useFormContext();
  return (
    <SelectMemo
    
    {...props}
      methods={methods}
    />
  );
}

export default Select;
