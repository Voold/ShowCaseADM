import styles from './UserSlot.module.css'
import UserAvatar from '../../assets/user-avatar.svg?react'
import OpenIcon from "./assets/up.svg?react"
import type { ComponentPropsWithRef } from "react";

export interface UserSlotProps extends ComponentPropsWithRef<'div'> {
  id: string,
  fullName: string,
  avatar?: string,
  email?: string,
  userRole?: UserRoleTypes
}

export type UserRoleTypes = {
  title: string,
  isActive: boolean
}

export const UserSlot = (
        ({
          id,
          fullName,
          avatar,
          email,
          userRole,
          className = '',
          children,
          ref,
           ...props
        } : UserSlotProps, ) => {
  return (
    <div className={`${styles.container} ${className}`} {...props} ref={ref}>
      <div className={styles.avatarContainer}>
        {avatar ?
            (<img className={styles.avatar} src={avatar} alt='Аватарка'/>) :
            (<UserAvatar className={styles.avatar} />)}
        <div className={styles.description}>
          <p className={styles.name}>{fullName}</p>
          <p className={styles.id}>{id}</p>
        </div>
      </div>

      {email &&
        (<a className={styles.email}>
          {email}
          <OpenIcon className={styles.openIcon}/>
        </a>)
      }
      {userRole &&
        (<p className={`${styles.role} ${userRole.isActive ? styles.active : styles.inactive}`}>
          {userRole.title}
        </p>)
      }
      {children}
    </div>
  );
});
