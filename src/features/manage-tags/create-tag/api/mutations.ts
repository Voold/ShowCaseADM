import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTag, queryKeys, type Tag } from '@/entities/tag'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useCreateTag = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (payload: Omit<Tag, 'id'>) => createTag(payload),
    onSuccess: (_, { name }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      show({ status: 'success', title: 'Успех', description: `Тег "${name}" успешно добавлен` })
    },
    onError: (error, { name }) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при создании тега "${name}": ${message}"` })
    }
  })
}
