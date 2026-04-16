import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared'

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
