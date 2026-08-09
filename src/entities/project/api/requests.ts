import { mapProjectDto } from '../lib/mappers'
import type { Project } from '../model/types'
import type { GetProjectsResponse } from './types'
import { api, ENDPOINTS } from '@/shared'

export async function getProjects(filters: {
  query: string
  offset: number
  limit: number
}): Promise<{ projects: Project[]; total: number }> {
  const { query: q, ...params } = filters
  const { data } = await api.get<GetProjectsResponse>(ENDPOINTS.PROJECTS, { params: { q, ...params } })
  return { projects: data.hits.map(mapProjectDto), total: data.total }
}

export async function getUserProjects(
  userId: string,
  filters: { query: string; offset: number; limit: number }
): Promise<{ projects: Project[]; total: number }> {
  const { query: q, ...params } = filters
  const { data } = await api.get<GetProjectsResponse>(ENDPOINTS.PROJECTS, { params: { q, ...params, userId } })
  return { projects: data.hits.map(mapProjectDto), total: data.total }
}