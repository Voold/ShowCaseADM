import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getPartnersByName } from "./requests"

export const usePartnersByName = (query: string, offset: number, limit: number) => {
  const trimmedQuery = query.trim()
	return useQuery({
		queryKey: queryKeys.search(trimmedQuery, offset, limit),
		queryFn: () => getPartnersByName(trimmedQuery, offset, limit),
		staleTime: 60 * 1000 // 1 min
	})
}