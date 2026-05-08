// TODO - Обновить тип юзера
export type User = {
  id: string
  name: string
  role: string
  email: string
  avatarUrl: string
}

export type UserDto = {
  id: number
  profilePicture?: string
  meta: {
    firstName: string
    lastName: string
  }
  email: string
  role: string
}
