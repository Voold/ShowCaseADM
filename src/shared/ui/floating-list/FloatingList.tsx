import styles from './FloatingList.module.css'
import type { ComponentPropsWithoutRef } from 'react'

export function FloatingList({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`${styles.list} ${className ?? ''}`} {...props}>
      {children}
    </div>
  )
}
