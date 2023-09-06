import { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  formMethods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
}

const Form = <T extends FieldValues>({
  formMethods,
  onSubmit,
  children,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
