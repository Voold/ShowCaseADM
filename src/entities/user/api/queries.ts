import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { User } from '../model/types'
import type { AxiosError } from 'axios'
import { queryKeys } from './queryKeys'
import { getMe } from './requests'

export const useMe = (enabled = true): UseQueryResult<User, AxiosError> => {
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: getMe,
    retry: false,
    enabled,
    staleTime: Infinity
  })
}
