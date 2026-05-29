import type { ReactNode } from 'react'
import styles from './QuickActions.module.css'

export interface QuickActionsProps {
  title?: string
  children: ReactNode
}

export const QuickActions = ({ title = 'Быстрые действия', children }: QuickActionsProps) => {
  return (
      <section className={styles.mainContainer}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.content}>{children}</div>
    </section>
  )
}