import type { ProjectDto } from '../model/types'

export type GetProjectsResponse = {
  hits: ProjectDto[]
  limit: number
  offset: number
  total: number
}