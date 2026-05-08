import type { User, UserDto } from '../model/types'
import defaultAvatar from '../assets/user-avatar.svg'

export const mapUserDto = (dto: UserDto): User => {
  return {
    id: String(dto.id),
    name: `${dto.meta.lastName} ${dto.meta.firstName}`,
    role: dto.role,
    email: dto.email,
    avatarUrl: dto.profilePicture || defaultAvatar
  }
}
