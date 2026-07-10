import styles from './UserRolesManager.module.css'
import { UserRolesUpdateForm, UserRolesUpdateFormSkeleton } from '@/features/update-user-roles'
import { UserSlot, UserSlotSkeleton, useUserById } from '@/entities/user'

interface UserRolesManagerProps {
  userId: string
}

export function UserRolesManager({ userId }: UserRolesManagerProps) {
  const { data: user, isLoading, isError } = useUserById(userId)

  if (isLoading)
    return (
      <div className={styles.container}>
        <UserSlotSkeleton className={styles.slot} />
        <UserRolesUpdateFormSkeleton />
      </div>
    )
  if (isError || !user) return <h2>Произошла ошибка :P</h2>

  return (
    <div className={styles.container}>
      <UserSlot className={styles.slot} user={user} />
      <UserRolesUpdateForm userId={userId} />
    </div>
  )
}
