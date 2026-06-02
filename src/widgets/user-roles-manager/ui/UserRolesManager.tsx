import styles from './UserRolesManager.module.css'
import { IssuingARole } from '@/features/issuing-a-role'
import { UserSlot, useUserById } from '@/entities/user'

interface UserRolesManagerProps {
  userId: string
}

export function UserRolesManager({ userId }: UserRolesManagerProps) {
  const { data: user, isLoading, isError } = useUserById(userId)

  if (isLoading) return <h2>Загрузка</h2>
  if (isError || !user) return <h2>Ошибка</h2>

	return (
		<div className={styles.container}>
			<UserSlot className={styles.slot} user={user} />
			<IssuingARole userRoles={user.roles} />
		</div>
	)
}
