import styles from './ProjectRoleTypeRow.module.css'
import { TextSkeleton } from '@/shared'

export function ProjectRoleTypeRowSkeleton() {
  return (
    <div className={styles.container}>
      <TextSkeleton className={styles.skeleton} />
      <TextSkeleton className={styles.skeleton} />
    </div>
  )
}
