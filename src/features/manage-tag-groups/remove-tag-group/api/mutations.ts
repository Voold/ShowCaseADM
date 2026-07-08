import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys, removeTagGroup } from '@/entities/tag'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useRemoveTagGroup = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (id: string) => removeTagGroup(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      show({ status: 'success', title: 'Успех', description: `Группа с ID ${id} удалена` })
    },
    onError: (error, id) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении группы с ID ${id}: ${message}` })
    }
  })
}
