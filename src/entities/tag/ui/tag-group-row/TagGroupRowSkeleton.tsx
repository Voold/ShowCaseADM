import styles from './TagGroupRow.module.css'
import { TextSkeleton } from '@/shared'

export function TagGroupRowSkeleton() {
  return <TextSkeleton className={styles.skeleton} />
}
