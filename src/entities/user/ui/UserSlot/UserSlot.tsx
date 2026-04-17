import styles from './UserSlot.module.css'
import UserAvatar from '../../assets/user-avatar.svg?react'
import type {UserSlotProps} from "../../model/types.ts";
import OpenIcon from "./assets/up.svg?react"
import {forwardRef} from "react";

export const UserSlot = forwardRef<HTMLDivElement, UserSlotProps>(
        ({
          id,
          fullName,
          avatar,
          email,
          userRole,
          className = '',
          children,
          ...props
        }, ref) => {
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

UserSlot.displayName = 'UserSlot';
