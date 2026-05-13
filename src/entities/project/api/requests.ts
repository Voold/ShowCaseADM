import { mapProjectDto } from '../lib/mappers'
import type { Project, ProjectDto } from '../model/types'
import { api, ENDPOINTS } from '@/shared'

export async function getProjectsByName(query: string, offset: number, limit: number): Promise<Project[]> {
  const params = { offset, limit, query }
  const { data } = await api.get<ProjectDto[]>(String(ENDPOINTS.PROJECTS_BY_NAME), { params })
  return data.map(mapProjectDto)
}
