import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToastsStore } from '@/entities/toast'
import { editTag, queryKeys, type Tag } from '@/entities/tag'
import type { BackendError } from '@/shared'

export const useEditTag = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()
  return useMutation({
    mutationFn: (newTag: Tag) => editTag(newTag.id, newTag),
    onSuccess: (_, newTag) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      show({ status: 'success', title: 'Успех', description: `Тег с ID ${newTag.id} обновлён` })
    },
    onError: (error, { id }) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении тега с ID ${id}: ${message}"` })
    }
  })
}
