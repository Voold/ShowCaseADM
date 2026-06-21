import { type TagDto } from './types'
import type { Tag } from '../model/types'
import { mapTagDto } from '../lib/mappers'
import { api, ENDPOINTS } from '@/shared'

// export const getTagsByName = async (query: string, offset: number, limit: number): Promise<GetTagsResponse> => {
export const getTagsByName = async (query: string, offset: number, limit: number): Promise<Tag[]> => {
  const params = { offset, limit, query }
  const { data } = await api.get<TagDto[]>(ENDPOINTS.TAGS, { params })
  return data.map(tag => mapTagDto(tag))
  // const { data } = await api.get<GetTagsResponse>(ENDPOINTS.TAGS, { params })
  // return { tags: data.tags.map(tag => mapTagDto(tag)), total: data.total }
}

export const createTag = async (payload: Omit<Tag, 'id'>): Promise<string> => {
  const dtoPayload: Omit<TagDto, 'tagId'> = { tagName: payload.name }
  const { data: id } = await api.post<string>(ENDPOINTS.TAGS, dtoPayload) // TODO check backend response types 
  return id
}

export const editTag = async (id: string, payload: Tag): Promise<void> => {
  const dtoPayload: TagDto = { tagId: payload.id, tagName: payload.name }
  await api.put(ENDPOINTS.TAG_BY_ID(id), dtoPayload)
}

export const removeTag = async (id: string): Promise<void> => {
  await api.delete(ENDPOINTS.TAG_BY_ID(id))
}
