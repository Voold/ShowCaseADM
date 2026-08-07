import type { Project, ProjectDto, ProjectStatus } from '../model/types'

export const mapProjectDto = (dto: ProjectDto): Project => ({
  type: dto.type,
  id: dto.id,
  ownerId: dto.ownerId.toString(),
  partnerId: dto.partnerId,
  status: dto.status.toLowerCase() as ProjectStatus,
  meta: dto.meta,
  checkpointGroup: {
    id: dto.checkpoints.id,
    title: dto.checkpoints.name,
    checkpoints: dto.checkpoints.checkpoints.map(c => {
      const [year, month, day] = c.deadline.split('-').map(Number)
      const deadline = new Date(year, month - 1, day)
      return { title: c.title, deadline: deadline }
    })
  },
  roles: dto.roles?.map(r => {
    const { places, ...props } = r
    return { studentIds: places, ...props }
  }),
  primaryTag: {
    id: dto.primaryTag.tagId,
    name: dto.primaryTag.tagName,
    groupId: dto.primaryTag.groupId
  },
  tags: dto.tags?.map(t => ({
    id: t.tagId,
    name: t.tagName,
    groupId: t.groupId
  })),
  prdMeta: dto.prdMeta,
  isPromoted: dto.isPromoted,
  isLikedByMe: dto.isLikedByMe
})
