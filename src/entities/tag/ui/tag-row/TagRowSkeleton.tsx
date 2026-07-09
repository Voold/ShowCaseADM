import styles from './TagRow.module.css'
import { TextSkeleton } from '@/shared'

export function TagRowSkeleton() {
  return <TextSkeleton className={styles.skeleton} />
}
