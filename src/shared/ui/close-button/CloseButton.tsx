import type { ComponentPropsWithoutRef } from 'react'
import styles from './CloseButton.module.css'

export function CloseButton({ className, ...props }: Omit<ComponentPropsWithoutRef<'button'>, 'children'>) {
  return <button className={`${styles.button} ${className ?? ''}`} {...props} />
}
