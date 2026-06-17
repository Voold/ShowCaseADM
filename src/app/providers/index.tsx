import type { ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from '@/widgets/toast-provider'
import { queryClient } from '@/shared'

interface AppProviderProps {
  children?: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastProvider />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
