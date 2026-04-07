import { api } from '@/shared/api'
import type { AuthResponse, OAuthExchangeParams } from './types'
import { ENDPOINTS } from '@/shared/config'

export const authRequests = {
  login: async (params: OAuthExchangeParams): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(ENDPOINTS.LOGIN, params)
    return data
  },
  logout: async (): Promise<void> => {
    await api.post(ENDPOINTS.LOGOUT)
  }
}
