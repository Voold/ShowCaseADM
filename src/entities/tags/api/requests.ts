import { type GetTagsResponse, type TagDto } from './types'
import type { Tag } from '../model/types'
import { mapTagDto } from '../lib/mappers'
import { api, ENDPOINTS } from '@/shared'

export const getTagsByName = async (query: string, offset: number, limit: number): Promise<{ tags: Tag[]; total: number }> => {
  const params = { offset, limit, query }
  const { data } = await api.get<GetTagsResponse>(ENDPOINTS.TAGS, { params })
  return { tags: data.tags.map(tag => mapTagDto(tag)), total: data.total }
}

export const createTag = async (payload: Omit<Tag, 'id'>): Promise<string> => {
  const dtoPayload: Omit<TagDto, 'tagId'> = { tagName: payload.name }
  const { data: id } = await api.post<string>(ENDPOINTS.TAGS, dtoPayload)
  return id
}

export const editTag = async (id: string, payload: Omit<Tag, 'id'>): Promise<void> => {
  const dtoPayload: Omit<TagDto, 'tagId'> = { tagName: payload.name }
  await api.put(ENDPOINTS.TAG_BY_ID(id), dtoPayload)
}

export const removeTag = async (id: string): Promise<void> => {
  await api.delete(ENDPOINTS.TAG_BY_ID(id))
}
