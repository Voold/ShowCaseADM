import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { RemoveUserRoleVariables, SetUserRoleVariables } from './types'
import { deleteUserRole, putUserRole, ROLE_WEIGHTS, userKeys, type User, type UserRole } from '@/entities/user'

export const useSetUserRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, type, payload }: SetUserRoleVariables) => putUserRole(userId, type, payload),
    onSuccess: (_, vars) => {
      const { userId, type, payload } = vars
      const queryKey = userKeys.user(userId)

      const previousUser = queryClient.getQueryData<User>(queryKey)
      if (previousUser) {
        queryClient.setQueryData<User>(queryKey, {
          ...previousUser,
          roles: [...previousUser.roles, { type, weight: ROLE_WEIGHTS[type], ...payload } as UserRole]
          // вместо приведения типов ради безопасности можно использовать switch case c assertNever, но код сильно раздуется.
        })
      }
    }
  })
}

export const useRemoveUserRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, type }: RemoveUserRoleVariables) => deleteUserRole(userId, type),
    onSuccess: (_, vars) => {
      const { userId, type } = vars
      const queryKey = userKeys.user(userId)

      const previousUser = queryClient.getQueryData<User>(queryKey)
      if (previousUser) {
        queryClient.setQueryData<User>(queryKey, {
          ...previousUser,
          roles: previousUser.roles.filter(role => role.type !== type)
        })
      }
    }
  })
}
