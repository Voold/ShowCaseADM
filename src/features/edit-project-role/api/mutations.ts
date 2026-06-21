import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editProjectRole, queryKeys, type ProjectRole } from "@/entities/project-role"
import { useToastsStore } from "@/entities/toast"
import type { BackendError } from "@/shared"

export const useEditProjectRole = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()
  return useMutation({
    mutationFn: (newRole: ProjectRole) => editProjectRole(newRole.id, newRole),
    onSuccess: (_, newRole) => {
      queryClient.setQueryData(queryKeys.projectRole(newRole.id), newRole)
      queryClient.invalidateQueries({ queryKey: queryKeys.search })

      show({ status: 'success', title: 'Успех', description: `Роль с ID ${newRole.id} обновлена` })
    },
		onError: (error, { id }) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении роли с ID ${id}: ${message}"` })
    }
  })
}
