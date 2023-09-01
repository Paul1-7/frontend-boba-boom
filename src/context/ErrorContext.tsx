// ErrorContext.tsx
import { SOCKETS_EVENTS } from "@/constants";
import { socketServices } from "@/utils";
import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface ErrorContextType {
  error: string | null;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleErrorEvent = (errorData: { message: string }) => {
      setError(errorData.message);
      toast.success(errorData.message);
    };

    socketServices.onEvent(SOCKETS_EVENTS.ERROR, handleErrorEvent);

    return () => {
      socketServices.offEvent(SOCKETS_EVENTS.ERROR);
    };
  }, []);

  return (
    <ErrorContext.Provider value={{ error }}>{children}</ErrorContext.Provider>
  );
};

export default ErrorContext;
