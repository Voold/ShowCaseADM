import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys, removeProjectRole } from '@/entities/project-role'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useRemoveTag = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (id: string) => removeProjectRole(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.projectRole(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.search })

      show({ status: 'success', title: 'Успех', description: `Роль с ID ${id} удалена` })
    },
    onError: (error, id) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении роли с ID ${id}: ${message}"` })
    }
  })
}
