import { InputProps } from '../types';
import { InputMemo } from '../memo';
import { useFormContext } from 'react-hook-form';


function Input(props:InputProps) {
  const methods = useFormContext();
  return (
    <InputMemo
    
    {...props}
      methods={methods}
    />
  );
}

export default Input;
