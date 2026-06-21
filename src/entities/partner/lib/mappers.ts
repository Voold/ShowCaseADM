import partnerAvatar from '../assets/partner-avatar.svg'
import type { PartnerDto } from "../api/types";
import type { Partner } from "../model/types";

export const mapPartnerDto = (dto: PartnerDto): Partner => ({
	id: dto.id,
	name: dto.name,
	avatarUrl: dto.profilePicture ?? partnerAvatar
})