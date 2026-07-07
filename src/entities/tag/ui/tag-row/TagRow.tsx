import type { ComponentPropsWithoutRef } from 'react'
import styles from './TagRow.module.css'
import type { Tag } from '../../model/types'

interface TagRowProps extends ComponentPropsWithoutRef<'div'> {
  tag: Tag
}

export function TagRow({ tag, className, children, ...props }: TagRowProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`} {...props}>
      <p>{tag.name}</p>
      <div className={styles.actions}>{children}</div>
    </div>
  )
}
