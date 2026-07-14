import { mapProjectRoleTypeDto } from '../lib/mappers'
import type { ProjectRoleType, ProjectRoleTypeDto } from '../model/types'
import { api, ENDPOINTS } from '@/shared'

export const getProjectRoleTypes = async () => {
  const { data } = await api.get<ProjectRoleTypeDto[]>(ENDPOINTS.PROJECT_ROLES)
  return data.map(mapProjectRoleTypeDto)
}

export const createProjectRoleType = async (payload: Omit<ProjectRoleType, 'id'>) => {
  const dtoPayload: Omit<ProjectRoleTypeDto, 'id'> = { name: payload.name }
  const { data } = await api.post<{ roleTypeId: string }>(ENDPOINTS.PROJECT_ROLES, dtoPayload)
  return data.roleTypeId
}

export const editProjectRoleType = async (id: string, payload: ProjectRoleType): Promise<void> => {
  const dtoPayload: ProjectRoleTypeDto = { id: payload.id, name: payload.name }
  await api.put(ENDPOINTS.PROJECT_ROLE_BY_ID(id), dtoPayload)
}

export const removeProjectRoleType = async (id: string): Promise<void> => {
  await api.delete(ENDPOINTS.PROJECT_ROLE_BY_ID(id))
}
