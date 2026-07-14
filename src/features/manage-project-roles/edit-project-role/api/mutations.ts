import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editProjectRoleType, projectRoleTypeQueryKeys, type ProjectRoleType } from '@/entities/project-role-type'
import { useToastsStore } from '@/entities/toast'
import type { BackendError } from '@/shared'

export const useEditProjectRole = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()
  return useMutation({
    mutationFn: (newRole: ProjectRoleType) => editProjectRoleType(newRole.id, newRole),
    onSuccess: (_, newRole) => {
      queryClient.setQueryData(projectRoleTypeQueryKeys.type(newRole.id), newRole)
      queryClient.invalidateQueries({ queryKey: projectRoleTypeQueryKeys.search })

      show({ status: 'success', title: 'Успех', description: `Роль с ID ${newRole.id} обновлена` })
    },
    onError: (error, { id }) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении роли с ID ${id}: ${message}"` })
    }
  })
}
