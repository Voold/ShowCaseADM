import styles from './UserSlot.module.css'
import UserAvatar from '../../assets/user-avatar.svg?react'
import type { ComponentPropsWithoutRef } from 'react'

export function UserSlot({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <UserAvatar className={styles.avatar} />
      <div className={styles.description}>
        <p className={styles.name}>Чел челиков</p>
        <p className={styles.role}>xxx-xxx</p>
      </div>
      {children}
    </div>
  )
}
