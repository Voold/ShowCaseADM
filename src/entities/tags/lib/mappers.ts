import type { TagDto } from "../api/types";
import type { Tag } from "../model/types";

export const mapTagDto = (dto: TagDto): Tag => ({
	id: dto.tagId,
	name: dto.tagName
})