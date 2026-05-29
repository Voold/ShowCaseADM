import { useEffect, useState } from 'react'
import styles from './IssuingARole.module.css'
import type { UserRole } from '@/entities/user/model/types'
import { getRoleTranslation } from '@/entities/user';
import { AgreeButton } from '@/shared/ui/agree-button/AgreeButton';

const ALL_ROLES = [
  {type: 'Default'},
  {type: 'Student'},
  {type: 'Admin'},
  {type: 'Curator'},
  {type: 'Mentor'},
  {type: 'Moderator'},
  {type: 'ROOP'},
  {type: 'Teacher'},
] as const

interface IssuingARoleProps {
  userRoles?: UserRole[],
  onChange?: (newRoles: string[]) => void;
  onSubmit?: () => void;
  // roles: [
  //   Default?: {},
  //   Student?: {},
  //   Admin?: {},
  //   Curator?: {},
  //   Mentor?: {},
  //   Moderator?: {},
  //   ROOP?: {},
  //   Teacher?: {},
  // ]
}

export const IssuingARole = ({ userRoles = [], onChange, onSubmit } : IssuingARoleProps) => {

  const [initialRoles, setInitialRoles] = useState<Set<string>>(() =>
    new Set(userRoles.map((role) => String(role.type)))
  );

  const [roles, setRoles] = useState<Set<string>>(() =>
    new Set(userRoles.map((role) => String(role.type)))
  );

  useEffect(() => {
    const initialSet = new Set(userRoles.map((role) => String(role.type)));
    setInitialRoles(initialSet);
    setRoles(initialSet);
  }, [userRoles]);

  const isRolesChanged = () => {
    if (roles.size !== initialRoles.size) {
      return true
    }

    for (const role of roles) {
      if (!initialRoles.has(role)) {
        return true
      }
    }

    return false
  }

  const handleToggleRole = (role: string) => {
    setRoles((prev) => {
      const newRoles = new Set(prev)

      if (newRoles.has(role)) {
        newRoles.delete(role)
      } else {
        newRoles.add(role)
      }
      
      onChange?.(Array.from(newRoles));

      return newRoles
    })
  }

  const handleSubmitRoles = () => {
    console.log(roles)
  }

  const isActive = isRolesChanged()

  return (
    <aside className={styles.mainContainer}>
      <p className={styles.snippet}>Роли пользователя</p>
      <ul className={styles.roleList}>
        {
          ALL_ROLES.map((role) => {

            const isSelected = roles.has(role.type)

            return (
              <li
                key={role.type}
                className={`${styles.roleItem} ${isSelected ? styles.active : ''}`}
                onClick={() => handleToggleRole(role.type)}
              >
                {getRoleTranslation(role as UserRole)}
              </li>
            )
          })
        }
      </ul>
      <AgreeButton
        active={isActive}
        onSubmit={handleSubmitRoles}
      />
    </aside>
  )
}