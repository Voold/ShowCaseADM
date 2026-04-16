import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { pkceService } from '../lib/pkce'
import { userKeys } from '@/entities/user'
import { login, logout } from '@/entities/user'
import type { AuthResponse, OAuthExchangeParams } from '@/entities/user'

export const useLogin = (): UseMutationResult<AuthResponse, AxiosError, OAuthExchangeParams> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      queryClient.setQueryData(userKeys.me(), data.user)
      pkceService.clear()
    }
  })
}

export const useLogout = (): UseMutationResult<void, AxiosError, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
