import styles from './TagsSkeleton.module.css'
import { TagGroupRowSkeleton, TagRowSkeleton } from '@/entities/tag'

export function TagsSkeleton() {
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
