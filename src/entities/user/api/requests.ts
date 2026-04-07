import { api } from '@/shared/api'
import { ENDPOINTS } from '@/shared/config'
import type { User } from '../model/types'

class UserRequests {
  public async getMe(): Promise<User> {
    const { data } = await api.get<User>(ENDPOINTS.ME)
    return data
  }

  //ANCHOR - other feature
  public async getUserById(uid: string): Promise<User> {
    const { data } = await api.get<User>(`${ENDPOINTS.USER_BY_ID}${uid}`)
    return data
  }
}

export const userRequests = new UserRequests()
