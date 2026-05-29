import { useEffect, useState } from 'react'
import styles from './IssuingARole.module.css'
import { getRoleTranslation, type UserRole } from '@/entities/user';
import {ALL_ROLES} from "@/entities/user";
import { AgreeButton } from '@/shared';

interface IssuingARoleProps {
  userRoles?: UserRole[],
  onChange?: (newRoles: string[]) => void;
  onSubmit?: () => void;
}

const EMPTY_ROLES: UserRole[] = [];

export const IssuingARole = ({ userRoles = EMPTY_ROLES, onChange, onSubmit } : IssuingARoleProps) => {

  const [initialRoles, setInitialRoles] = useState<Set<string>>(() =>
    new Set(userRoles.map((role) => String(role.type)))
  );

  const [roles, setRoles] = useState<Set<string>>(() =>
    new Set(userRoles.map((role) => String(role.type)))
  );

  const serializedRoles = userRoles.map((role) => String(role.type)).join(',');

  useEffect(() => {
    const initialSet = new Set(userRoles.map((role) => String(role.type)));
    setInitialRoles(initialSet);
    setRoles(initialSet);
  }, [serializedRoles]);

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
    onSubmit?.()
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