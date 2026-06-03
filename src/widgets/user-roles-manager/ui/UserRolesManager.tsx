import styles from './UserRolesManager.module.css'
import { UserRolesUpdateForm } from '@/features/update-user-roles'
import { UserSlot, useUserById } from '@/entities/user'

interface UserRolesManagerProps {
  userId: string
}

export function UserRolesManager({ userId }: UserRolesManagerProps) {
  const { data: user, isLoading, isError } = useUserById(userId)

  if (isLoading) return <h2>Загрузка...</h2>
  if (isError || !user) return <h2>Произошла ошибка :P</h2>

	return (
		<div className={styles.container}>
			<UserSlot className={styles.slot} user={user} />
			<UserRolesUpdateForm userId={userId} />
		</div>
	)
}
