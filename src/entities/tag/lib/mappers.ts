import type { Tag, TagDto, TagGroup, TagGroupDto } from "../model/types";

export const mapTagDto = (dto: TagDto): Tag => ({
	id: dto.tagId,
	name: dto.tagName,
	groupId: dto.groupId
})

export const mapTagGroupDto = (dto: TagGroupDto): TagGroup => ({
	id: dto.groupId,
	name: dto.groupName,
	tags: dto.tags.map(mapTagDto)
})