export type TagDto = {
  tagId: string
  tagName: string
}

export type GetTagsResponse = {
  tags: TagDto[]
  total: number
}
