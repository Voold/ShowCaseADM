import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { checkpointQueryKeys, removeCheckpointGroup } from '@/entities/checkpoint'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useRemoveCheckpointGroup = () => {
	const queryClient = useQueryClient()
  const { show } = useToastsStore()
	
  return useMutation({
    mutationFn: (groupId: string) => removeCheckpointGroup(groupId),
		onSuccess: (_, groupId) => {
      queryClient.invalidateQueries({ queryKey: checkpointQueryKeys.all })
      show({ status: 'success', title: 'Успех', description: `Набор чекпоинтов с ID ${groupId} удалён` })
    },
    onError: (error, id) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении набора чекпоинтов с ID ${id}: ${message}"` })
    }
  })
}
