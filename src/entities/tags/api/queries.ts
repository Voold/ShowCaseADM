import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getTagsByName } from "./requests"

export const useTagsByName = (query: string, offset: number, limit: number) => {
  const trimmedQuery = query.trim()
	return useQuery({
		queryKey: queryKeys.search(trimmedQuery, offset, limit),
		queryFn: () => getTagsByName(trimmedQuery, offset, limit),
		staleTime: 60 * 1000 // 1 min
	})
}