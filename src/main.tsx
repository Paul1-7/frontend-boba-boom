import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { SocketProvider } from './context/SocketContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OrderProvider } from './context/OrdersContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <OrderProvider>
          <SocketProvider>
            <QueryClientProvider client={queryClient}>
              <Toaster richColors visibleToasts={1} />
              <App />
            </QueryClientProvider>
          </SocketProvider>
        </OrderProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
)
