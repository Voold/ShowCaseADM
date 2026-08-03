import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { checkpointQueryKeys, createCheckpointGroup, type CheckpointGroup } from '@/entities/checkpoint'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useCreateCheckpointGroup = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (group: Omit<CheckpointGroup, 'id'>) => createCheckpointGroup(group),
    onSuccess: (_, { title }) => {
      queryClient.invalidateQueries({ queryKey: checkpointQueryKeys.all })
      show({ status: 'success', title: 'Успех', description: `Группа чекпоинтов "${title}" успешно создана` })
    },
    onError: (error, { title }) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при создании группы чекпоинтов "${title}": ${message}"` })
    }
  })
}
