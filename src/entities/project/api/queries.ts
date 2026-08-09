import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { getProjects, getUserProjects } from './requests'

export const useProjects = (filters: { query: string; offset: number; limit: number }) => {
  return useQuery({
    queryKey: queryKeys.list(filters),
    queryFn: () => getProjects(filters),
    staleTime: 60 * 1000
  })
}

export const useUserProjects = (userId: string, filters: { query: string; offset: number; limit: number }) => {
  return useQuery({
    queryKey: queryKeys.userList(userId, filters),
    queryFn: () => getUserProjects(userId, filters),
    staleTime: 60 * 1000
  })
}
