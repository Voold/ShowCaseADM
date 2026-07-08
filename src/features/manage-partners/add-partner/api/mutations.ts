import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPartner, queryKeys, type Partner } from "@/entities/partner"
import { useToastsStore } from "@/entities/toast"
import type { BackendError } from "@/shared"

export const useAddPartner = () => {
	const queryClient = useQueryClient()
  const { show } = useToastsStore()

  return useMutation({
    mutationFn: (payload: Omit<Partner, "id">) => addPartner(payload),
    onSuccess: (partnerId, vars) => {
      queryClient.invalidateQueries({queryKey: [...queryKeys.all, 'search']})
      queryClient.invalidateQueries({queryKey: queryKeys.partner(partnerId)})
      
      show({ status: 'success', title: 'Успех', description: `Партнёр "${vars.name}" успешно добавлен` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({ status: 'error', title: 'Ошибка', description: `Произошла ошибка при создании партнёра "${vars.name}": ${message}"` })
    }
  })
}