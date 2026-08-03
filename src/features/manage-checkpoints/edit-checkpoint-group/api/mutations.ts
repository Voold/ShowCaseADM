import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { checkpointQueryKeys, editCheckpointGroup, type CheckpointGroup } from "@/entities/checkpoint"
import { useToastsStore } from "@/entities/toast"
import type { BackendError } from "@/shared"

export const useEditCheckpointGroup = () => {
	const queryClient = useQueryClient()
  const { show } = useToastsStore()
  return useMutation({
    mutationFn: (newGroup: CheckpointGroup) => editCheckpointGroup(newGroup),
    onSuccess: (_, newGroup) => {
      queryClient.invalidateQueries({ queryKey: checkpointQueryKeys.all })
      show({ status: 'success', title: 'Успех', description: `Набор чекпоинтов с ID ${newGroup.id} обновлён` })
    },
    onError: (error, { id }) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при удалении тега с ID ${id}: ${message}"` })
    }
  })
}