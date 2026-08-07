/* eslint-disable fsd/no-cross-slice-dependency */
/* eslint-disable fsd/forbidden-imports */
import type { Tag } from '@/entities/tag'
import type { ProjectRoleType } from '@/entities/project-role-type'
import type { CheckpointGroup } from '@/entities/checkpoint'

export type ProjectStatus = 'active' | 'approved' | 'rejected' | 'pending' | 'completed' | 'archived'
export type ProjectType = 'Case' | 'Real' | 'Study'

export type Project = {
  type: ProjectType
  id: string
  ownerId: string
  partnerId: string
  status: ProjectStatus
  meta: {
    title: string
    description: string
  }
  checkpointGroup: CheckpointGroup
  roles?: {
    roleId: string
    roleType: ProjectRoleType
    placesCount: number
    minPlacesCount: number
    studentIds: string[]
    skills: {
      skillId: string
      skillName: string
    }[] // TODO change to skill entity
    meta: {
      description: string
    }
  }[]
  primaryTag: Tag
  tags?: Tag[]
  prdMeta: StudyProjectPrdDto | CaseProjectPrdDto | RealProjectPrdDto
  isPromoted: boolean
  isLikedByMe?: boolean
}

export type ProjectDto = {
  type: ProjectType
  id: string
  ownerId: number
  partnerId: string
  status: Uppercase<ProjectStatus>
  meta: {
    title: string
    description: string
  }
  checkpoints: {
    id: string
    name: string
    checkpoints: {
      title: string
      deadline: string
    }[]
  }
  roles?: {
    roleId: string
    roleType: {
      id: string
      name: string
    }
    placesCount: number
    minPlacesCount: number
    places: string[]
    skills: {
      skillId: string
      skillName: string
    }[]
    meta: {
      description: string
    }
  }[]
  primaryTag: {
    tagId: string
    tagName: string
    groupId: string
  }
  tags?: {
    tagId: string
    tagName: string
    groupId: string
  }[]
  prdMeta: StudyProjectPrdDto | CaseProjectPrdDto | RealProjectPrdDto
  isPromoted: boolean
  isLikedByMe?: boolean
}

type StudyProjectPrdDto = {
  prerequisites: string
  projectGoal: string
  keyFunctionality: string[]
}

type CaseProjectPrdDto = {
  prerequisites: string
  audience: {
    title: string
    minAge: number
    maxAge: number
    description: string
  }[]
  projectGoal: string
  functional: string[]
  problemStatement: string
}

type RealProjectPrdDto = {
  businessGoal: string
  productVision: string
  projectGoal: string
  audience: {
    title: string
    minAge: number
    maxAge: number
    description: string
  }[]
  businessMetrics: string[]
  functional: string[]
  nonFunctional: string[]
  projectPlan: string[]
}
