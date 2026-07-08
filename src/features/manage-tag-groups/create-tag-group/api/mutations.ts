import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTagGroup, queryKeys, type TagGroup } from "@/entities/tag"
import { useToastsStore } from "@/entities/toast"
import type { BackendError } from "@/shared"

export const useCreateTagGroup = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (payload: Omit<TagGroup, 'id' | 'tags'>) => createTagGroup(payload),
    onSuccess: (groupId, vars) => {
      const queryKey = queryKeys.group(groupId)
      queryClient.setQueryData<Omit<TagGroup, 'tags'>>(queryKey, { id: groupId, ...vars })
      queryClient.invalidateQueries({ queryKey: queryKeys.groups() })

      show({ status: 'success', title: 'Успех', description: `Группа "${vars.name}" успешно добавлена` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при создании группы "${vars.name}": ${message}` })
    }
  })
}