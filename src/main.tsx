import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { SocketProvider } from "./context/SocketContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            {/* <ErrorProvider> */}
            <Toaster richColors />
            <App />
            {/* </ErrorProvider> */}
          </QueryClientProvider>
        </SocketProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
