import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { RemoveUserRoleVariables, SetUserRoleVariables } from './types'
import {
  deleteUserRole,
  putUserRole,
  ROLE_WEIGHTS,
  ROLES_TRANSLATIONS,
  userKeys,
  type User,
  type UserRole
} from '@/entities/user'
import { useToastsStore } from '@/entities/toast'
import { type BackendError } from '@/shared'

export const useSetUserRole = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

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
        })
      }
      show({ status: 'success', title: 'Успех', description: `Роль ${ROLES_TRANSLATIONS[vars.type]} добавлена` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({
        status: 'error',
        title: 'Ошибка',
        description: `При добавлении роли ${ROLES_TRANSLATIONS[vars.type]} произошла ошибка: ${message}`
      })
    }
  })
}

export const useRemoveUserRole = () => {
  const queryClient = useQueryClient()
  const { show } = useToastsStore()

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
      show({ status: 'success', title: 'Успех', description: `Роль ${ROLES_TRANSLATIONS[vars.type]} добавлена` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({
        status: 'error',
        title: 'Ошибка',
        description: `При удалении роли ${ROLES_TRANSLATIONS[vars.type]} произошла ошибка: ${message}`
      })
    }
  })
}
