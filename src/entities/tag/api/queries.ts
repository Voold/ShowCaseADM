import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getTags } from "./requests"

export const useTags = () => {
	return useQuery({
		queryKey: queryKeys.all,
		queryFn: () => getTags(),
		staleTime: 60 * 1000 // 1 min
	})
}