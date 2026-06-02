import type { ComponentPropsWithoutRef } from 'react'
import { UserInfo, useUserById } from '@/entities/user'

interface UserProfileInfoProps extends ComponentPropsWithoutRef<'div'> {
  userId: string
}

export function UserProfileInfo({ userId, ...props }: UserProfileInfoProps) {
  const { data: user, isLoading, isError } = useUserById(userId)

  if (isLoading) return <h2>Загрузка</h2>
  if (isError || !user) return <h2>Ошибка</h2>

  const { bio, skills, experience } = user.meta
  return <UserInfo email={user.email} bio={bio} skills={skills} experience={experience} {...props} />
}
