import styles from './TagRow.module.css'
import { TextSkeleton } from '@/shared'

export function TagRowSkeleton() {
	return (
    <div className={styles.container}>
			<TextSkeleton className={styles.skeleton}/>
			<TextSkeleton className={styles.skeleton}/>
    </div>
  )
}