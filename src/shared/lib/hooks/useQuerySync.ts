import { useEffect, useState } from "react"
import { useDebounce } from "./useDebounce"

export const useQuerySync = (query: string, setQuery: (query: string) => void) => {
  const [localQuery, setLocalQuery] = useState(query)
  const debouncedQuery = useDebounce(localQuery, 500)

  useEffect(() => setQuery(debouncedQuery), [debouncedQuery])
  useEffect(() => setLocalQuery(query), [query])

	return [localQuery, setLocalQuery] as const
}
