import styles from './CheckpointGroup.module.css'
import s from './CheckpointGroupSkeleton.module.css'
import { TextSkeleton } from '@/shared'

export function CheckpointGroupSkeleton() {
  return (
    <div className={`${styles.container} ${s.container}`}>
      <div className={styles.header}>
        <TextSkeleton className={s.title} />
        <TextSkeleton className={s.actions} />
      </div>
      <div className={styles.list}>
        <TextSkeleton rows={3} />
      </div>
    </div>
  )
}
