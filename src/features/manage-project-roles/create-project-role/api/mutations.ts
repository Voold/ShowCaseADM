import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProjectRole, queryKeys, type ProjectRole } from '@/entities/project-role'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useCreateProjectRole = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (payload: Omit<ProjectRole, 'id'>) => createProjectRole(payload),
    onSuccess: (id, vars) => {
      const queryKey = queryKeys.projectRole(id)
      queryClient.setQueryData<ProjectRole>(queryKey, { id: id, ...vars })
      queryClient.invalidateQueries({ queryKey: queryKeys.search })

      show({ status: 'success', title: 'Успех', description: `Роль "${vars.name}" успешна создана` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при создании роли "${vars.name}": ${message}"` })
    }
  })
}
