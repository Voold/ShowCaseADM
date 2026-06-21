import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { getProjectRoles } from './requests'

export const useProjectRoles = () => {
  return useQuery({
    queryKey: queryKeys.search,
    queryFn: getProjectRoles,
    staleTime: 1000 * 60
  })
}
