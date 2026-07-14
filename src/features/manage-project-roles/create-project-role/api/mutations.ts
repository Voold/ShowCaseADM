import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProjectRoleType, projectRoleTypeQueryKeys, type ProjectRoleType } from '@/entities/project-role-type'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useCreateProjectRole = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (payload: Omit<ProjectRoleType, 'id'>) => createProjectRoleType(payload),
    onSuccess: (id, vars) => {
      const queryKey = projectRoleTypeQueryKeys.type(id)
      queryClient.setQueryData<ProjectRoleType>(queryKey, { id: id, ...vars })
      queryClient.invalidateQueries({ queryKey: projectRoleTypeQueryKeys.search })

      show({ status: 'success', title: 'Успех', description: `Роль "${vars.name}" успешна создана` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при создании роли "${vars.name}": ${message}"` })
    }
  })
}
