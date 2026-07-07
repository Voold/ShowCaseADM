import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToastsStore } from '@/entities/toast'
import { editTagGroup, queryKeys, type TagGroup } from '@/entities/tag'
import type { BackendError } from '@/shared'

export const useEditTagGroup = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()
  return useMutation({
    mutationFn: (newTagGroup: Omit<TagGroup, 'tags'>) => editTagGroup(newTagGroup.id, newTagGroup),
    onSuccess: (_, newTagGroup) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      show({ status: 'success', title: 'Успех', description: `Группа с ID ${newTagGroup.id} обновлена` })
    },
    onError: (error, { id }) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении группы с ID ${id}: ${message}"` })
    }
  })
}
