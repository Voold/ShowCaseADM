import type { ComponentPropsWithoutRef } from 'react'
import styles from './AgreeButton.module.css'

interface AgreeButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean
}

export const AgreeButton = ( {isLoading = false, disabled, className, children, ...props} : AgreeButtonProps) => {
  return(
    <button 
      className={`${styles.button} ${disabled ? styles.disabled : ""} ${className ?? ""}`} 
      type='submit'
      {...props}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  )
}