import { type UserDto } from '../model/types'

export const ROLES_TRANSLATIONS: Record<keyof UserDto['roles'], string> = {
  Default: 'Пользователь',
  Student: 'Студент',
  Admin: 'Админ',
  Curator: 'Куратор',
  Mentor: 'Ментор',
  Moderator: 'Модератор',
  Roop: 'РООП',
  Teacher: 'Преподаватель'
} as const

export const ROLE_WEIGHTS: Record<keyof UserDto['roles'], number> = {
  Default: 1,
  Student: 2,
  Admin: 3,
  Curator: 1,
  Mentor: 1,
  Moderator: 1,
  Roop: 1,
  Teacher: 1,
}