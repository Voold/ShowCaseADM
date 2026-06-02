import type { ComponentPropsWithoutRef } from 'react'
import styles from './UserInfo.module.css'

interface UserInfoProps extends ComponentPropsWithoutRef<'div'> {
  email: string
  bio?: string
  skills?: string
  experience?: string
}

export function UserInfo({ email, bio, skills, experience, className, ...props }: UserInfoProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`} {...props}>
      <p className={styles.title}>Почта:</p>
      {email}
      <p className={styles.title}>Биография:</p>
      {bio || 'Нет'}
      <p className={styles.title}>Скиллы:</p>
      {skills || 'Нет'}
      <p className={styles.title}>Опыт:</p>
      {experience || 'Нет'}
    </div>
  )
}
