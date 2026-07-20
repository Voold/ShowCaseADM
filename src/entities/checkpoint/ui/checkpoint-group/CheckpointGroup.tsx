import type { ComponentPropsWithoutRef, ReactElement } from 'react'
import styles from './CheckpointGroup.module.css'
import type { CheckpointGroup } from '../../model/types'
import { Checkpoint } from '../checkpoint/Checkpoint'

interface CheckpointGroupProps extends ComponentPropsWithoutRef<'div'> {
  group: CheckpointGroup
  actions?: ReactElement
}

export function CheckpointGroup({ group, actions, children, className, ...props }: CheckpointGroupProps) {
  const renderCheckpoints = () =>
    group.checkpoints.map(c => (
      <li key={c.title}>
        <Checkpoint checkpoint={c} />
      </li>
    )) // TODO проверить, валидируется ли на бэкенде

  return (
    <div className={`${styles.container} ${className ?? ''}`} {...props}>
      <div className={styles.header}>
        <h5>{group.title}</h5>
        <div className={styles.actions}>{actions}</div>
      </div>
      <ul className={styles.list}>{renderCheckpoints()}</ul>
      {children}
    </div>
  )
}
