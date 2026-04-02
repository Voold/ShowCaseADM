import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { User } from '../../model/types'
import { userRequests } from '../../api/requests'
import { queryKeys } from '../../api/queryKeys'

export const useMe = (enabled = true): UseQueryResult<User, AxiosError> => {
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: userRequests.getMe,
    retry: false,
    enabled,
    staleTime: Infinity
  })
}
