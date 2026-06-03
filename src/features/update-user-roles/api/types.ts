import type { UserRole } from '@/entities/user'

export type SetUserRoleVariables = {
  [T in UserRole['type']]: { userId: string; type: T; payload: Omit<Extract<UserRole, { type: T }>, 'type' | 'weight'> }
}[UserRole['type']]

export type RemoveUserRoleVariables = {
  userId: string,
  type: UserRole['type']
}