import type { AuthStatusResponse, OAuthExchangeParams } from './types'
import type { GetUsersResponse } from './types'
import type { User, UserBase, UserDto } from '../model/types'
import { mapUserBaseDto, mapUserDto } from '../lib/mappers'
import { api, ENDPOINTS } from '@/shared'

export async function login(params: OAuthExchangeParams): Promise<void> {
  await api.post(ENDPOINTS.LOGIN, params)
}

export async function getAuthStatus(): Promise<AuthStatusResponse> {
  const { data } = await api.get<AuthStatusResponse>(ENDPOINTS.STATUS)
  return data
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<UserDto>(ENDPOINTS.ME)
  return mapUserDto(data)
}

export async function logout(): Promise<void> {
  await api.post(ENDPOINTS.LOGOUT)
}

//ANCHOR - other feature
export async function getUserById(uid: string): Promise<User> {
  const { data } = await api.get<UserDto>(`${ENDPOINTS.USER_BY_ID}/${uid}`)
  return mapUserDto(data)
}

export async function getUsersByName(query: string, offset: number, limit: number): Promise<{users: UserBase[], total: number}> {
  const params = { offset, limit, query }
  const { data } = await api.get<GetUsersResponse>(ENDPOINTS.USERS_BY_NAME, { params })
  return { users: data.users.map(mapUserBaseDto), total: data.total }
}
