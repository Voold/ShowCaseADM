import styles from "./UserSlot.module.css";
import type { ComponentPropsWithRef } from "react";
import type { User } from "../../model/types";

export interface UserSlotProps extends ComponentPropsWithRef<"div"> {
  user: User
}

export const UserSlot = ({user, className, children, ...props}: UserSlotProps) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={user.profilePicture} alt="Аватарка" />
        
        <div className={styles.description}>
          <p className={styles.name}>{user.meta.name}</p>
          <p className={styles.id}>{user.id}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
