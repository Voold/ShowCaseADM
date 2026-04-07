import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { userKeys } from '@/entities/user'
import { pkceService } from '../lib/pkce'
import { authRequests } from './requests'
import type { AuthResponse, OAuthExchangeParams } from './types'

export const useLogin = (): UseMutationResult<AuthResponse, AxiosError, OAuthExchangeParams> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authRequests.login,
    onSuccess: data => {
      queryClient.setQueryData(userKeys.me(), data.user)
      pkceService.clear()
    }
  })
}

export const useLogout = (): UseMutationResult<void, AxiosError, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authRequests.logout,
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
