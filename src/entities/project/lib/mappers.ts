import type { Project, ProjectDto } from '../model/types'

export const mapProjectDto = (dto: ProjectDto): Project => ({
  id: String(dto.id),
  name: dto.name,
  school: dto.school,
  status: dto.status
})
