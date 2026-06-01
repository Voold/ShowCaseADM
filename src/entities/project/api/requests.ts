import { mapProjectDto } from '../lib/mappers'
import type { Project, ProjectDto } from '../model/types'
import type { GetUserProjectsResponse } from './types'
import { api, ENDPOINTS } from '@/shared'

export async function getProjectsByName(query: string, offset: number, limit: number): Promise<Project[]> {
  const params = { offset, limit, query }
  const { data } = await api.get<ProjectDto[]>(String(ENDPOINTS.PROJECTS_BY_NAME), { params })
  return data.map(mapProjectDto)
}

export async function getUserProjects(
  userId: string,
  params: { query: string; offset: number; limit: number }
): Promise<{ projects: Project[]; total: number }> {
  const { data } = await api.get<GetUserProjectsResponse>(`${ENDPOINTS.USER_PROJECTS}/${userId}`, { params })
  return { projects: data.projects.map(mapProjectDto), total: data.total }
}
