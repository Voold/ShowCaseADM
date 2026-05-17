import { ROLE_WEIGHTS, type User, type UserDto, type UserRole } from '../model/types'
import defaultAvatar from '../assets/user-avatar.svg'

const mapRoles = (dto: UserDto['roles']): UserRole[] => {
  return Object.entries(dto).map(([key, value]) => {
    const type = key as keyof UserDto['roles']
    return {
      type: type,
      weight: ROLE_WEIGHTS[type],
      ...value
    } as UserRole
  })
}

export const mapUserDto = (dto: UserDto): User => {
  return {
    id: String(dto.userId),
    email: dto.email,
    profilePicture: dto.profilePicture || defaultAvatar,
    meta: {
      name: `${dto.meta.lastName} ${dto.meta.firstName}`,
      ...dto.meta
    },
    roles: mapRoles(dto.roles),
    capabilities: dto.capabilities || [] // по хорошему заменить на юнион
  }
}
