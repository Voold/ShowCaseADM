import type { ComponentPropsWithoutRef } from 'react'
import styles from './AgreeButton.module.css'
import { Spinner } from '..'

interface AgreeButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean
}

export const AgreeButton = ( {isLoading = false, disabled, className, children, type = 'submit', ...props} : AgreeButtonProps) => {
  return(
    <button 
      className={`${styles.button} ${disabled ? styles.disabled : ""} ${className ?? ""}`} 
      type={type}
      {...props}
    >
      {isLoading ? <Spinner className={styles.spinner}/> : children}
    </button>
  )
}