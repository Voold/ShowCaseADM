import styles from './TagGroupSkeleton.module.css'
import { TagGroupRowSkeleton, TagRowSkeleton } from '@/entities/tag'

export function TagGroupSkeleton() {
  return (
    <div className={styles.container}>
      <TagGroupRowSkeleton />
      <div className={styles.tags}>
        <TagRowSkeleton />
        <TagRowSkeleton />
        <TagRowSkeleton />
      </div>
    </div>
  )
}
