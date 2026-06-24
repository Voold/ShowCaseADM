export type Tag = {
	id: string
	name: string
	groupId: string
}

export type TagGroup = {
	id: string
	name: string
	tags: Tag[]
}

export type TagDto = {
  tagId: string
  tagName: string
  groupId: string
}

export type TagGroupDto = {
	groupId: string
	groupName: string
	tags: TagDto[]
}