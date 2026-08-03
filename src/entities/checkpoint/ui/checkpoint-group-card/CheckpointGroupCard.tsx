import type { ComponentPropsWithoutRef, ReactElement } from 'react'
import styles from './CheckpointGroupCard.module.css'
import type { CheckpointGroup } from '../../model/types'
import { CheckpointRow } from '../checkpoint-row/CheckpointRow'

interface CheckpointGroupCardProps extends ComponentPropsWithoutRef<'div'> {
  group: CheckpointGroup
  actions?: ReactElement
}

export function CheckpointGroupCard({ group, actions, children, className, ...props }: CheckpointGroupCardProps) {
  const renderCheckpoints = () =>
    group.checkpoints.map(c => (
      <li key={c.title}>
        <CheckpointRow checkpoint={c} />
      </li>
    )) // TODO проверить, валидируется ли на бэкенде

  return (
    <div className={`${styles.container} ${className ?? ''}`} {...props}>
      <div className={styles.header}>
        <h5 className={styles.title}>{group.title}</h5>
        <div className={styles.actions}>{actions}</div>
      </div>
      <ul className={styles.list}>{renderCheckpoints()}</ul>
      {children}
    </div>
  )
}
