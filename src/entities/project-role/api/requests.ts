import type { ProjectRoleDto } from './types'
import { mapProjectRoleDto } from '../lib/mappers'
import type { ProjectRole } from '../model/types'
import { api, ENDPOINTS } from '@/shared'

export const getProjectRoles = async () => {
  const { data } = await api.get<ProjectRoleDto[]>(ENDPOINTS.PROJECT_ROLES)
  return data.map(mapProjectRoleDto)
}

export const createProjectRole = async (payload: Omit<ProjectRole, 'id'>) => {
  const dtoPayload: Omit<ProjectRoleDto, 'id'> = { name: payload.name }
  const { data } = await api.post<{ roleTypeId: string }>(ENDPOINTS.PROJECT_ROLES, dtoPayload)
  return data.roleTypeId
}

export const editProjectRole = async (id: string, payload: ProjectRole): Promise<void> => {
  const dtoPayload: ProjectRoleDto = { id: payload.id, name: payload.name }
  await api.put(ENDPOINTS.PROJECT_ROLE_BY_ID(id), dtoPayload)
}

export const removeProjectRole = async (id: string): Promise<void> => {
  await api.delete(ENDPOINTS.PROJECT_ROLE_BY_ID(id))
}
