import type { ComponentPropsWithoutRef } from 'react'
import styles from './ScrollableList.module.css'

interface ScrollableListProps extends ComponentPropsWithoutRef<'div'> {
  listClassName?: string
  isLoading?: boolean
}

export function ScrollableList({ listClassName, className, isLoading = false, children, ...props }: ScrollableListProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`} {...props}>
      <div className={`${styles.list} ${listClassName ?? ''} ${isLoading ? styles.loading : ''}`}>{children}</div>
    </div>
  )
}
