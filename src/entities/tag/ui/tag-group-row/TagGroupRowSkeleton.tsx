import styles from './TagGroupRow.module.css'
import { TextSkeleton } from '@/shared'

export function TagGroupRowSkeleton() {
	return (
    <div className={styles.container}>
			<TextSkeleton className={styles.skeleton}/>
			<TextSkeleton className={styles.skeleton}/>
    </div>
  )
}