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
      queryClient.invalidateQueries({queryKey: [...userKeys.all, 'search']})

      show({ status: 'success', title: 'Успех', description: `Роль ${ROLES_TRANSLATIONS[vars.type]} для пользователя с ID ${vars.userId} добавлена` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({
        status: 'error',
        title: 'Ошибка',
        description: `При добавлении роли ${ROLES_TRANSLATIONS[vars.type]} для пользователя с ID ${vars.userId} произошла ошибка: ${message}`
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
      queryClient.invalidateQueries({queryKey: [...userKeys.all, 'search']})
      
      show({ status: 'success', title: 'Успех', description: `Роль ${ROLES_TRANSLATIONS[vars.type]} пользователя с ID ${vars.userId} удалена` })
    },
    onError: (error, vars) => {
      const isBackendError = axios.isAxiosError<BackendError>(error) && error.response
      const message = isBackendError ? error.response?.data.msg : error.message
      show({
        status: 'error',
        title: 'Ошибка',
        description: `При удалении роли ${ROLES_TRANSLATIONS[vars.type]} пользователя с ID ${vars.userId} произошла ошибка: ${message}`
      })
    }
  })
}
