import type { ComponentPropsWithoutRef } from 'react'
import styles from './CheckpointRow.module.css'
import CircleCheckIcon from '../../assets/check-circle.svg?react'
import type { Checkpoint } from '../../model/types'
import { mapDateToLocalString } from '@/shared'

interface CheckpointRowProps extends ComponentPropsWithoutRef<'div'> {
  checkpoint: Checkpoint
}

export function CheckpointRow({ checkpoint, className, children, ...props }: CheckpointRowProps) {
  const isPassed = checkpoint.deadline <= new Date()

  return (
    <div className={`${styles.container} ${isPassed ? styles.passed : ''} ${className ?? ''}`} {...props}>
      <CircleCheckIcon className={styles.check} />
      <h6>{checkpoint.title}</h6>
      <span className={styles.dot} />
      <h6 className={styles.date}>{mapDateToLocalString(checkpoint.deadline)}</h6>
      {children}
    </div>
  )
}
