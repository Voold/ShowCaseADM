// TODO - Обновить тип юзера
export type User = UserBase & {
  profilePicture: string
  meta: {
    bio: string
    skills: string
    experience: string
  }
  capabilities: string[] // по хорошему заменить на юнион
}

export type UserBase = {
  id: string
  email: string
  roles: UserRole[]
  meta: {
    name: string
  }
} // TODO добавить фото профиля 

export type UserBaseDto = {
  userId: number
  email: string
  roles: string[]
  meta: {
    firstName: string
    lastName: string
  }
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
    Admin?: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Curator?: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Mentor?: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Moderator?: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    ROOP?: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Teacher?: {},
  }
  capabilities: string[] | null
}

type Role<T> = {
  [K in keyof Required<T>]: { type: K, weight: number } & T[K]
}[keyof Required<T>] // Объединяет результат в юнион вида {type: *роль*, ...}

export type UserRole = Role<UserDto['roles']>
