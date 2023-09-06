import { memo } from 'react';

import { Controller } from 'react-hook-form';
import { objectByString } from '@/utils/dataHandler';
import compare from 'just-compare';
import { Input } from '@nextui-org/react';
import { InputProps } from '../types';


const InputMemo = memo(
  ({ name, label, isDataPath, methods,  ...others }:InputProps) => {
    const error = methods?.formState?.errors ?? {};

 const errorValue = isDataPath ? objectByString(error, name) : error[name];
 
    return (
      <Controller
        name={name}
        control={methods?.control}
        render={({ field }) => (
         <Input 
            size='sm'
            variant='underlined'
            label={label}
            validationState={errorValue?.message ? "invalid": "valid"}
            errorMessage={errorValue?.message}
            {...field}
            onValueChange={field.onChange}
            {...others}
         />
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps?.disabled === nextProps?.disabled && !compare(prevProps.methods, nextProps.methods)
);

export default InputMemo;

