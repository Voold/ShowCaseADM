import type { User, UserDto } from '../model/types'

export const mapUserDto = (dto: UserDto): User => {
  return {
    id: String(dto.id),
    name: `${dto.lastName} ${dto.firstName}`,
    role: dto.role,
    email: dto.email
  }
}
