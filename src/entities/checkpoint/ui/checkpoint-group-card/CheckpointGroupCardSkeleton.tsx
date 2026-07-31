import styles from './CheckpointGroupCard.module.css'
import s from './CheckpointGroupCardSkeleton.module.css'
import { TextSkeleton } from '@/shared'

export function CheckpointGroupCardSkeleton() {
  return (
    <div className={`${styles.container} ${s.container}`}>
      <div className={styles.header}>
        <TextSkeleton className={s.title} />
        <TextSkeleton className={s.actions} />
      </div>
      <div className={styles.list}>
        <TextSkeleton rows={4} />
      </div>
    </div>
  )
}
