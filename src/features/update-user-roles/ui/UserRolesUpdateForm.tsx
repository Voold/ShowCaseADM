import { useState } from 'react'
import styles from './UserRolesUpdateForm.module.css'
import { useRemoveUserRole, useSetUserRole } from '../api/mutations'
import { ROLES_TRANSLATIONS, useUserById, type UserRole } from '@/entities/user'
import { ConfirmModal } from '@/shared'

interface UserRolesUpdateFormProps {
  userId: string
}

export function UserRolesUpdateForm({ userId }: UserRolesUpdateFormProps) {
  const { data: user, isLoading, isError } = useUserById(userId)

  if (isLoading) return <h2>Загрузка...</h2>
  if (isError || !user) return <h2>Произошла ошибка :P</h2>

  const { mutate: setRoleMutate, isPending: isSetPending } = useSetUserRole()
  const { mutate: removeRoleMutate, isPending: isRemovePending } = useRemoveUserRole()

  const [changingRole, setChangingRole] = useState<{ role: UserRole['type']; isActive: boolean } | null>(null)

  const handleRoleChange = (roleName: UserRole['type'], isActive: boolean) => {
    if (!isActive) {
      switch (roleName) {
        case 'Student': {
          const course = prompt('Введите курс обучения студента')
          if (!course) break

          const school = prompt('Введите инженерную школу обучающегося')
          if (!school) break

          const group = prompt('Введите номер группы студента')
          if (!group) break

          setRoleMutate({ userId: userId, type: roleName, payload: { course, school, meta: { group } } })
          break
        }
        default: {
          setRoleMutate({ userId: userId, type: roleName, payload: {} })
        }
      }
    } else {
      removeRoleMutate({ userId: userId, type: roleName })
    }
    setChangingRole(null)
  }

  const roleItems = Object.keys(ROLES_TRANSLATIONS).map(role => {
    const roleType = role as UserRole['type']
    const isActive = user.roles.some(r => r.type === roleType)
    return (
      <li
        key={role}
        className={`${styles.item} ${isActive && styles.active}`}
        onClick={() => setChangingRole({ role: roleType, isActive: isActive })}
      >
        {ROLES_TRANSLATIONS[roleType]}
      </li>
    )
  })

  return (
    <aside className={styles.container}>
      <p className={styles.title}>Роли пользователя</p>
      <ul className={styles.list}>{isSetPending || isRemovePending ? <h5>Загрузка...</h5> : roleItems}</ul>
      <ConfirmModal
        isOpened={changingRole !== null}
        isPending={isSetPending || isRemovePending}
        onSubmit={() => handleRoleChange(changingRole!.role, changingRole!.isActive)}
        onReject={() => setChangingRole(null)}
      />
    </aside>
  )
}
