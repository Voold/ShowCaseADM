import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { getProjectsByName } from './requests'

export const useProjectsByName = (query: string, offset: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.search(query, offset, limit),
    queryFn: () => getProjectsByName(query, offset, limit),
    enabled: !!query.trim(),
    staleTime: 60 * 1000 // 1 min
  })
}
