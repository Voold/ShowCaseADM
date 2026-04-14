import { queryClient } from '@/shared/api'
import { QueryClientProvider } from '@tanstack/react-query'

interface AppProviderProps {
  children?: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
			{children}
    </QueryClientProvider>
  )
}
