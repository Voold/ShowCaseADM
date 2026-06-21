import type { GetPartnersResponse, PartnerDto } from "./types"
import type { Partner } from "../model/types"
import { mapPartnerDto } from "../lib/mappers"
import { api, ENDPOINTS } from "@/shared"

export const getPartnersByName = async (query: string, offset: number, limit: number): Promise<{partners: Partner[], total: number}> => {
	const params = { offset, limit, query }
	const { data } = await api.get<GetPartnersResponse>(ENDPOINTS.PARTNERS, { params })
	return { partners: data.partners.map(partner => mapPartnerDto(partner)), total: data.total }
}

export const addPartner = async (payload: Omit<Partner, 'id'>): Promise<string> => {
	const dtoPayload: Omit<PartnerDto, 'id'> = { name: payload.name, profilePicture: payload.avatarUrl }
	const { data } = await api.post<{partnerId: string}>(ENDPOINTS.PARTNERS, dtoPayload)
	return data.partnerId
}