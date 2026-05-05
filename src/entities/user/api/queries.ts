import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { User } from '../model/types'
import type { AxiosError } from 'axios'
import { queryKeys } from './queryKeys'
import { getMe, getUsersByName } from './requests'

export const useMe = (enabled = true): UseQueryResult<User, AxiosError> => {
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: getMe,
    retry: false,
    enabled,
    staleTime: Infinity
  })
}

export const useUsersByName = (query: string, offset: number, limit: number) => {
  const trimmedQuery = query.trim()
  return useQuery({
    queryKey: queryKeys.search(trimmedQuery, offset, limit),
    queryFn: () => getUsersByName(trimmedQuery, offset, limit),
    enabled: !!trimmedQuery,
    staleTime: 60 * 1000 // 1 min, может вынести в queryClient?
  })
}