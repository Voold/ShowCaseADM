import type { ComponentPropsWithoutRef } from 'react'
import styles from './TagGroupRow.module.css'
import type { TagGroup } from '../../model/types'

interface TagGroupRowProps extends ComponentPropsWithoutRef<'div'> {
  group: Omit<TagGroup, 'tags'>
}

export function TagGroupRow({ group, className, children, ...props }: TagGroupRowProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`} {...props}>
      <p>{group.name}</p>
      <div className={styles.actions}>{children}</div>
    </div>
  )
}
