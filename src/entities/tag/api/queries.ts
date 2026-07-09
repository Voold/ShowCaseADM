import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getTagGroups, getTags } from "./requests"

export const useTags = () => {
	return useQuery({
		queryKey: queryKeys.all,
		queryFn: getTags,
		staleTime: 60 * 1000 // 1 min
	})
}

export const useTagGroups = () => {
	return useQuery({
		queryKey: queryKeys.groups(),
		queryFn: getTagGroups,
		staleTime: 60 * 1000
	})
}