import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { User } from "../model/types"
import type { AxiosError } from "axios"
import { userRequests } from "./requests"
import { userKeys } from "../model/keys"

export const useMe = (enabled = true): UseQueryResult<User, AxiosError> => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userRequests.getMe,
    retry: false,
    enabled,
    staleTime: Infinity
  })
}