import { api } from '@/shared/api'
import { ENDPOINTS } from '@/shared/config'
import type { AuthResponse, OAuthExchangeParams } from './types'
import type { User } from '../model/types'

class UserRequests {
  public async login(params: OAuthExchangeParams): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(ENDPOINTS.LOGIN, params)
    return data
  }

  public async getMe(): Promise<User> {
    const { data } = await api.get<User>(ENDPOINTS.ME)
    return data
  }

  public async logout(): Promise<void> {
    await api.post(ENDPOINTS.LOGOUT)
  }

  //ANCHOR - other feature
  public async getUserById(uid: string): Promise<User> {
    const { data } = await api.get<User>(`${ENDPOINTS.USER_BY_ID}${uid}`)
    return data
  }
}

export const userRequests = new UserRequests()
