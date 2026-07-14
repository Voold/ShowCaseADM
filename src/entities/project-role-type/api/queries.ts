import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { getProjectRoleTypes } from './requests'
import type { ProjectRoleType } from '../model/types'

export const useProjectRoleTypes = () => {
  return useQuery<ProjectRoleType[]>({
    queryKey: queryKeys.search,
    queryFn: getProjectRoleTypes,
    staleTime: 1000 * 60
  })
}
