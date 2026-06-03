import styles from './UserRolesUpdateForm.module.css'
import { useRemoveUserRole, useSetUserRole } from '../api/mutations'
import { ROLES_TRANSLATIONS, useUserById, type UserRole } from '@/entities/user'

interface UserRolesUpdateFormProps {
  userId: string
}

export function UserRolesUpdateForm({ userId }: UserRolesUpdateFormProps) {
  const { data: user, isLoading, isError } = useUserById(userId)

  if (isLoading) return <h2>Загрузка...</h2>
  if (isError || !user) return <h2>Произошла ошибка :P</h2>

  const { mutate: setRoleMutate, isPending: isSetPending } = useSetUserRole()
  const { mutate: removeRoleMutate, isPending: isRemovePending } = useRemoveUserRole()

  const handleRoleChange = (roleName: UserRole['type'], isActive: boolean) => {
    if (!isActive) {
      if (!confirm(`Вы точно хотите добавить роль "${ROLES_TRANSLATIONS[roleName]}?"`)) return
      switch (roleName) {
        case 'Student': {
          const course = prompt('Введите курс обучения студента')
          if (!course) return

          const school = prompt('Введите инженерную школу обучающегося')
          if (!school) return

          const group = prompt('Введите номер группы студента')
          if (!group) return

          setRoleMutate({ userId: userId, type: roleName, payload: { course, school, meta: { group } } })
          break
        }
        default: {
          setRoleMutate({ userId: userId, type: roleName, payload: {} })
        }
      }
    } else {
      if (!confirm(`Вы точно хотите удалить роль "${ROLES_TRANSLATIONS[roleName]}?"`)) return
      removeRoleMutate({ userId: userId, type: roleName })
    }
  }

  const roleItems = Object.keys(ROLES_TRANSLATIONS).map(role => {
    const roleType = role as UserRole['type']
    const isActive = user.roles.some(r => r.type === roleType)
    return (
      <li
        key={role}
        className={`${styles.item} ${isActive && styles.active}`}
        onClick={() => handleRoleChange(roleType, isActive)}
      >
        {ROLES_TRANSLATIONS[roleType]}
      </li>
    )
  })

  return (
    <aside className={styles.container}>
      <p className={styles.title}>Роли пользователя</p>
      <ul className={styles.list}>
        {isSetPending || isRemovePending ? <h5>Загрузка...</h5> : roleItems}
      </ul>
    </aside>
  )
}
