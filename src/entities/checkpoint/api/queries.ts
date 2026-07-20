import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getCheckpointGroups } from "./requests"

export const useCheckpointGroups = () => {
	return useQuery({
		queryKey: queryKeys.all,
		queryFn: getCheckpointGroups,
		staleTime: 60 * 1000
	})
}