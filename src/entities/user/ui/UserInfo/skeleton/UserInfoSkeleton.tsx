import styles from '../UserInfo.module.css'
import s from './UserInfoSkeleton.module.css'
import { TextSkeleton } from '@/shared'

export function UserInfoSkeleton() {
  return (
    <div className={`${styles.container}`}>
      <p className={styles.title}>Почта:</p>
      <TextSkeleton />
      <p className={styles.title}>Биография:</p>
      <div className={s.description}>
        <TextSkeleton rows={2} />
      </div>
      <p className={styles.title}>Скиллы:</p>
      <TextSkeleton />
      <p className={styles.title}>Опыт:</p>
      <TextSkeleton />
    </div>
  )
}
