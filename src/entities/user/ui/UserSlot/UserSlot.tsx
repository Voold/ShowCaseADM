import styles from './UserSlot.module.css'
import type { ComponentPropsWithRef } from 'react'
import defaultProfilePicture from '../../assets/user-avatar.svg'
import type { UserBase } from '../../model/types'

export interface UserSlotProps extends ComponentPropsWithRef<'div'> {
  user: UserBase
}

export const UserSlot = ({ user, className, children, ...props }: UserSlotProps) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <div className={styles.avatarContainer}>
        {/* <img className={styles.avatar} src={user.profilePicture} alt="Фото профиля" /> */}
        <img className={styles.avatar} src={defaultProfilePicture} alt='Фото профиля' /> {/* TODO убрать когда дадут аватарку на Base */}

        <div className={styles.description}>
          <p className={styles.name}>{user.meta.name}</p>
          <p className={styles.id}>{user.id}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
