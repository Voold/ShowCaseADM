import type { ComponentPropsWithoutRef, ReactElement } from 'react'
import styles from './Input.module.css'
import { CloseButton } from '../close-button/CloseButton'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  leadingIcon?: ReactElement
  isCloseAlwaysVisible?: boolean
  onClear?: () => void
}

export function Input({
  onClear,
  className,
  placeholder,
  value,
  onChange,
  children,
  leadingIcon,
  isCloseAlwaysVisible = false,
  ...props
}: InputProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      {leadingIcon}
      <input type='text' placeholder={placeholder} value={value} onChange={onChange} {...props} />
      {children}
      {((onClear && value) || isCloseAlwaysVisible) && <CloseButton className={styles.closeButton} onClick={onClear} type='button' tabIndex={-1} />}
    </div>
  )
}
