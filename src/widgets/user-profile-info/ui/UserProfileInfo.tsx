import type { ComponentPropsWithoutRef } from 'react'
import { UserInfo, UserInfoSkeleton, useUserById } from '@/entities/user'

interface UserProfileInfoProps extends ComponentPropsWithoutRef<'div'> {
  userId: string
}

export function UserProfileInfo({ userId, ...props }: UserProfileInfoProps) {
  const { data: user, isLoading, isError } = useUserById(userId)

  if (isLoading) return <UserInfoSkeleton />
  if (isError || !user) return <h2>Ошибка</h2>

  const { bio, competencies, experience } = user.meta
  return <UserInfo email={user.email} bio={bio} competencies={competencies.map(c => c.name)} experience={experience} {...props} />
}
