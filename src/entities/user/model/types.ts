// TODO - Обновить тип юзера
export type User = {
  id: string
  email: string
  profilePicture: string
  meta: {
    name: string
    bio: string
    skills: string
    experience: string
  }
  roles: UserRole[]
  capabilities: string[] // по хорошему заменить на юнион
}

type Role<T> = {
  [K in keyof Required<T>]: { type: K, weight: number } & T[K]
}[keyof Required<T>] // Объединяет результат в юнион вида {type: *роль*, ...}

export type UserRole = Role<UserDto['roles']>

export const ROLE_WEIGHTS: Record<keyof UserDto['roles'], number> = {
  Default: 1,
  Student: 2,
  Admin: 3
}

export type UserDto = {
  userId: number
  email: string
  profilePicture: string | null
  meta: {
    firstName: string
    lastName: string
    bio: string
    skills: string
    experience: string
  }
  roles: {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Default?: {}
    Student?: {
      course: string
      school: string
      meta: {
        group: string
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Admin?: {}
  }
  capabilities: string[] | null
}
