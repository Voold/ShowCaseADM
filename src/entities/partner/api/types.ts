export type PartnerDto = {
	id: string,
	name: string,
	profilePicture?: string
}

export type GetPartnersResponse = {
	partners: PartnerDto[]
	limit: number
	offset: number
	total: number
}