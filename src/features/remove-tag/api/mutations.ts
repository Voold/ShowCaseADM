import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys, removeTag } from '@/entities/tag'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useRemoveTag = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (id: string) => removeTag(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.tag(id) })
      queryClient.invalidateQueries({ queryKey: [...queryKeys.all, 'search'] })

      show({ status: 'success', title: 'Успех', description: `Тег с ID ${id} удалён` })
    },
    onError: (error, id) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении тега с ID ${id}: ${message}"` })
    }
  })
}
