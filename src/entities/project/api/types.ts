import type { ProjectDto } from '../model/types'

export type GetUserProjectsResponse = {
  projects: ProjectDto[]
  limit: number
  offset: number
  total: number
}

export type GetProjectsResponse = {
  projects: ProjectDto[]
  limit: number
  offset: number
  total: number
}
