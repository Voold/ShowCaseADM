import type { Tag, TagDto, TagGroup, TagGroupDto } from '../model/types'
import { mapTagGroupDto } from '../lib/mappers'
import { api, ENDPOINTS } from '@/shared'

export const getTags = async (): Promise<TagGroup[]> => {
  const { data } = await api.get<TagGroupDto[]>(ENDPOINTS.TAGS)
  return data.map(mapTagGroupDto)
}

export const getTagGroups = async (): Promise<Omit<TagGroup, 'tags'>[]> => {
  const { data } = await api.get<Omit<TagGroupDto, 'tags'>[]>(ENDPOINTS.TAG_GROUPS)
  return data.map(dto => ({ id: dto.groupId, name: dto.groupName }))
}

export const createTag = async (payload: Omit<Tag, 'id'>): Promise<string> => {
  const dtoPayload: Omit<TagDto, 'tagId'> = { tagName: payload.name, groupId: payload.groupId }
  const { data } = await api.post<{ tagId: string }>(ENDPOINTS.TAGS, dtoPayload)
  return data.tagId
}

export const createTagGroup = async (payload: Omit<TagGroup, 'id' | 'tags'>): Promise<string> => {
  const dtoPayload: Omit<TagGroupDto, 'groupId' | 'tags'> = { groupName: payload.name }
  const { data } = await api.post<{ groupId: string }>(ENDPOINTS.TAG_GROUPS, dtoPayload)
  return data.groupId
}

export const editTag = async (id: string, payload: Tag): Promise<void> => {
  const dtoPayload: TagDto = { tagId: payload.id, tagName: payload.name, groupId: payload.groupId }
  await api.put(ENDPOINTS.TAG_BY_ID(id), dtoPayload)
}

export const editTagGroup = async (id: string, payload: Omit<TagGroup, 'tags'>): Promise<void> => {
  const dtoPayload: Omit<TagGroupDto, 'tags'> = { groupId: payload.id, groupName: payload.name }
  await api.put(ENDPOINTS.TAG_GROUP_BY_ID(id), dtoPayload)
}

export const removeTag = async (id: string): Promise<void> => {
  await api.delete(ENDPOINTS.TAG_BY_ID(id))
}

export const removeTagGroup = async (id: string): Promise<void> => {
  await api.delete(ENDPOINTS.TAG_GROUP_BY_ID(id))
}
