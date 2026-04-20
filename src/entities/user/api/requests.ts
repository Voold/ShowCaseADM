import type { AuthResponse, OAuthExchangeParams } from './types'
import type { User } from '../model/types'
import { api, ENDPOINTS } from '@/shared'

export async function login(params: OAuthExchangeParams): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>(ENDPOINTS.LOGIN, params)
  return data
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>(ENDPOINTS.ME)
  return data
}

export async function logout(): Promise<void> {
  await api.post(ENDPOINTS.LOGOUT)
}

//ANCHOR - other feature
export async function getUserById(uid: string): Promise<User> {
  const { data } = await api.get<User>(`${ENDPOINTS.USER_BY_ID}${uid}`)
  return data
}
