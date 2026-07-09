import styles from './ProjectRoleRow.module.css'
import { TextSkeleton } from '@/shared'

export function ProjectRoleRowSkeleton() {
  return (
    <div className={styles.container}>
      <TextSkeleton className={styles.skeleton} />
    </div>
  )
}
