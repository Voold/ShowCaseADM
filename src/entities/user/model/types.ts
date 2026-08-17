/* eslint-disable @typescript-eslint/no-empty-object-type */
export type User = UserBase & {
  meta: {
    bio: string
    competencies: {
      id: string
      name: string
      skills: {
        id: string
        name: string
      }[]
    }[]
    experience: string
  }
  capabilities: string[] // по хорошему заменить на юнион
}

export type UserBase = {
  id: string
  email: string
  roles: UserRole[]
  profilePicture: string
  meta: {
    name: string
  }
}

export type UserBaseDto = {
  userId: number
  email: string
  meta: {
    firstName: string
    lastName: string
  }
  roles?: string[]
  profilePicture?: string
}

export type UserDto = {
  userId: number
  email: string
  profilePicture?: string
  capabilities?: string[]
  meta: {
    firstName: string
    lastName: string
    bio: string
    skills?: {
      roleTypeId: string
      roleTypeName: string
      skills?: {
        skillId: string
        skillName: string
      }[]
    }[]
    experience: string
  }
  roles: {
    Default?: {}
    Student?: {
      course: string
      school: string
      meta: {
        group: string
      }
    },
    Admin?: {},
    Curator?: {},
    Mentor?: {},
    Moderator?: {},
    Roop?: {},
    Teacher?: {},
  }
}

type Role<T> = {
  [K in keyof Required<T>]: { type: K, weight: number } & T[K]
}[keyof Required<T>]

export type UserRole = Role<UserDto['roles']>
